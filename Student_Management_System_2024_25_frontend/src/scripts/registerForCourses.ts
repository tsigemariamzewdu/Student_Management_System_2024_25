// Get elements from the form
const courseSearchField = document.getElementById("course-search") as HTMLInputElement;
const departmentSelect = document.getElementById("department") as HTMLSelectElement;
const yearSelect = document.getElementById("year") as HTMLSelectElement;
const semesterSelect = document.getElementById("semester") as HTMLSelectElement;
const registerButton = document.getElementById("register") as HTMLButtonElement;
const logoutButton=document.getElementById("logout") as HTMLButtonElement
 

const userId=localStorage.getItem("userId")

logoutButton.addEventListener("click",async()=>{
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('studentId');
  localStorage.removeItem('updatedStudent');
  localStorage.removeItem('userName');

  window.location.href = 'index.html';
})





// Event listener for the Register button to get courses by department, year, and semester
registerButton.addEventListener("click", async () => {
  const department = departmentSelect.value;
  const year = yearSelect.value;
  const semester = semesterSelect.value;

  if (department && year && semester) {
    // Fetch courses based on the selected department, year, and semester
    const courses = await getCoursesByDepartmentYearSemester(department, year, semester);
    if (courses) {
      console.log(courses);
      displayCourseTable(courses);
    } else {
      alert("No courses found for the selected filters.");
    }
  } else {
    alert("Please select a department, year, and semester.");
  }
});

// Function to fetch courses by department, year, and semester
const getCoursesByDepartmentYearSemester = async (department: string, year: string, semester: string) => {
  const BASE_URL = "http://localhost:4000";
  
  try {
    const response = await fetch(`${BASE_URL}/courses/getCourses/${year}/${semester}/${department}`);
    
    if (!response.ok) {
      console.error("No courses found for the selected filters.");
      return null;
    }

    const courseData = await response.json();
   
    return courseData.courseNames;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return null;
  }
};

// Function to display course details in a table
// Function to display course details in a table with roll numbers
// Function to display course details in a table with roll numbers and a register button
const displayCourseTable = (courses: string[]) => {
    const tableContainer = document.getElementById("course-table-container");
  
    if (!tableContainer) {
      console.error("Table container not found!");
      return;
    }
  
    // Ensure we're working with an array
    const coursesArray = Array.isArray(courses) ? courses : [];
  
    tableContainer.innerHTML = "";
  
    if (coursesArray.length === 0) {
      tableContainer.innerHTML = "<p>No courses found.</p>";
      return;
    }
  
    const table = document.createElement("table");
    table.classList.add("table", "table-striped");
  
    const tableHeader = document.createElement("thead");
    tableHeader.innerHTML = `
      <tr>
        <th>Roll No.</th>
        <th>Course Name</th>
        <th>Select</th>
      </tr>
    `;
    table.appendChild(tableHeader);
  
    const tableBody = document.createElement("tbody");
  
    coursesArray.forEach((course: string, index: number) => {
      const row = document.createElement("tr");
  
      const rollNumberCell = document.createElement("td");
      rollNumberCell.textContent = (index + 1).toString(); // Add roll number
      row.appendChild(rollNumberCell);
  
      const nameCell = document.createElement("td");
      nameCell.textContent = course;
      row.appendChild(nameCell);
  
      const selectCell = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("course-checkbox");
      checkbox.value = course;
      selectCell.appendChild(checkbox);
      row.appendChild(selectCell);
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    tableContainer.appendChild(table);
  
    // Add "Register for Selected Courses" button
    const registerCoursesButton = document.createElement("button");
    registerCoursesButton.textContent = "Register for Selected Courses";
    registerCoursesButton.classList.add("btn", "btn-primary", "mt-3");
    registerCoursesButton.style.float = "right"; 
    tableContainer.appendChild(registerCoursesButton);
  
    // Add event listener to the register button
    registerCoursesButton.addEventListener("click", () => {
      const selectedCourses: string[] = [];
      const checkboxes = document.querySelectorAll(".course-checkbox");
  
      checkboxes.forEach((checkbox) => {
        if ((checkbox as HTMLInputElement).checked) {
          selectedCourses.push((checkbox as HTMLInputElement).value);
        }
      });
  
      if (selectedCourses.length > 0) {
        console.log(selectedCourses)
        registerSelectedCourses(selectedCourses);
      } else {
        alert("No courses selected. Please select at least one course.");
      }
    });
  };
  
  // Function to register selected courses
  const registerSelectedCourses = async (courses: string[]) => {
    const BASE_URL = "http://localhost:4000";
    const token = localStorage.getItem("accessToken");
    const studentId=localStorage.getItem("studentId")
    console.log( "i am logging the course",courses,studentId)
    try {
      const response = await fetch(`${BASE_URL}/student/add-courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

          
        },
        body: JSON.stringify({ studentId: Number(studentId), courseNames: courses }),
      });
  
      if (response.ok) {
        const responseData=await response.json()
        console.log(responseData.updatedStudent)
        localStorage.setItem("updatedStudent", JSON.stringify(responseData.updatedStudent));
        alert("Successfully registered for selected courses!");
        
        window.location.href = 'myCourses.html';

      } else {
        console.error("Failed to register for courses.");
        alert("Error occurred while registering for courses. Please try again.");
      }
    } catch (error) {
      console.error("Error registering courses:", error);
      alert("Error occurred while registering for courses. Please try again.");
    }
  };
  
