interface Course {
  id: number;
  name: string;
  code: string;
  department: string;
  year?: number;
}

interface Student {
  id: number;
  userId: number;
  year: number;
  department: string;
  courses?: Course[];
}



document.addEventListener("DOMContentLoaded", () => {
  const updatedStudentData = localStorage.getItem("updatedStudent");
  const logoutButton = document.getElementById("logout") as HTMLButtonElement;

  logoutButton.addEventListener("click", async () => {
    localStorage.clear(); // Clear all localStorage items
    window.location.href = "index.html";
  });

  if (updatedStudentData) {
    try {
      const updatedStudent: Student = JSON.parse(updatedStudentData);

      if (updatedStudent && typeof updatedStudent === "object") {
        console.log("Updated Student Data:", updatedStudent);

        const studentInfoDiv = document.getElementById("student-info");

        if (studentInfoDiv) {
          if (updatedStudent.courses && updatedStudent.courses.length > 0) {
            studentInfoDiv.innerHTML = renderStudentInfo(updatedStudent);

            // Attach event listeners for individual delete actions
            document.querySelectorAll(".delete-course").forEach((button) => {
              button.addEventListener("click", async (event) => {
                const targetRow = (event.target as HTMLElement).closest("tr");
                if (targetRow) {
                  const courseId = parseInt(targetRow.getAttribute("data-course-id") || "0", 10);
                  await deleteCourse(updatedStudent.id, courseId);
                  updatedStudent.courses = updatedStudent.courses?.filter(course => course.id !== courseId);
                  localStorage.setItem("updatedStudent", JSON.stringify(updatedStudent)); // Persist changes
                  studentInfoDiv.innerHTML = renderStudentInfo(updatedStudent); // Re-render
                  attachEventListeners(updatedStudent); // Re-attach event listeners
                }
              });
            });

            // Attach event listener for "Delete All Courses" button
            const deleteAllButton = document.getElementById("delete-all") as HTMLButtonElement;
            deleteAllButton.addEventListener("click", async () => {
              const success = await deleteAllCourses(updatedStudent.id);
              if (success) {
                updatedStudent.courses = [];
                localStorage.setItem("updatedStudent", JSON.stringify(updatedStudent)); // Persist changes
                studentInfoDiv.innerHTML = `
                  <div class="alert alert-warning" role="alert">
                    No courses available.
                  </div>
                `;
              }
            });
          } else {
            studentInfoDiv.innerHTML = `
              <div class="alert alert-warning" role="alert">
                No courses available.
              </div>
            `;
          }
        } else {
          console.error("Element with ID 'student-info' not found.");
        }
      } else {
        console.error("Parsed data is not a valid object.");
      }
    } catch (error) {
      console.error("Failed to parse updated student data:", error);
    }
  } else {
    console.warn("No updated student data found in localStorage.");
  }

  function renderStudentInfo(student: Student): string {
    if (!student.courses || student.courses.length === 0) {
      return `
        <div class="alert alert-warning" role="alert">
          No courses available.
        </div>
      `;
    }

    return `
      <div class="card mt-4">
        <div class="card-body">
          <h3 class="card-title">Student Details</h3>
          <p><strong>Student ID:</strong> ${student.id}</p>
          <p><strong>Role Number:</strong> ${student.userId}</p>
          <p><strong>Year:</strong> ${student.year}</p>
          <p><strong>Department:</strong> ${student.department}</p>
          <h4>Registered Courses:</h4>
          <table class="table table-striped table-bordered mt-3">
            <thead class="thead-dark">
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Code</th>
                <th>Department</th>
                <th>Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${student.courses
                .map(
                  (course: Course, index: number) => `
                  <tr data-course-id="${course.id}">
                    <td>${index + 1}</td>
                    <td>${course.name || "Unknown Course"}</td>
                    <td>${course.code || "Unknown Code"}</td>
                    <td>${course.department || "Unknown Department"}</td>
                    <td>${course.year || "N/A"}</td>
                    <td>
                      <span class="text-danger delete-course" style="cursor: pointer;">Delete</span>
                    </td>
                  </tr>`
                )
                .join("")}
            </tbody>
          </table>
          <button id="delete-all" class="btn btn-danger mt-3">Delete All Courses</button>
        </div>
      </div>
    `;
  }

  function attachEventListeners(student: Student): void {
    document.querySelectorAll(".delete-course").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const targetRow = (event.target as HTMLElement).closest("tr");
        if (targetRow) {
          const courseId = parseInt(targetRow.getAttribute("data-course-id") || "0", 10);
          await deleteCourse(student.id, courseId);
          student.courses = student.courses?.filter(course => course.id !== courseId);
          localStorage.setItem("updatedStudent", JSON.stringify(student)); // Persist changes
          const studentInfoDiv = document.getElementById("student-info");
          if (studentInfoDiv) {
            studentInfoDiv.innerHTML = renderStudentInfo(student); // Re-render
            attachEventListeners(student); // Re-attach event listeners
          }
        }
      });
    });

    const deleteAllButton = document.getElementById("delete-all") as HTMLButtonElement;
    if (deleteAllButton) {
      deleteAllButton.addEventListener("click", async () => {
        const success = await deleteAllCourses(student.id);
        if (success) {
          student.courses = [];
          localStorage.setItem("updatedStudent", JSON.stringify(student)); // Persist changes
          const studentInfoDiv = document.getElementById("student-info");
          if (studentInfoDiv) {
            studentInfoDiv.innerHTML = `
              <div class="alert alert-warning" role="alert">
                No courses available.
              </div>
            `;
          }
        }
      });
    }
  }

  async function deleteCourse(studentId: number, courseId: number): Promise<void> {
    try {
      const token = localStorage.getItem("accessToken");
      const BASE_URL = "http://localhost:4000";
      const response = await fetch(`${BASE_URL}/student/${studentId}/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete course with ID ${courseId}`);
      }
      console.log(`Course with ID ${courseId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  }

  async function deleteAllCourses(studentId: number): Promise<boolean> {
    try {
      const token = localStorage.getItem("accessToken");
      const BASE_URL = "http://localhost:4000";
      const response = await fetch(`${BASE_URL}/student/${studentId}/courses`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to delete all courses for student ID ${studentId}`);
      }
      console.log(`All courses for student ID ${studentId} deleted successfully.`);
      return true;
    } catch (error) {
      console.error("Error deleting all courses:", error);
      return false;
    }
  }
});

