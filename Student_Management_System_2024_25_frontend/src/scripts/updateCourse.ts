window.addEventListener("DOMContentLoaded", async () => {
    const courseId = localStorage.getItem("courseId");

    if (!courseId) {
        alert("No course ID found. Please go back and select a course to update.");
        window.location.href = "listOfCourses.html";
        return;
    }

    try {
        // Fetch the course details from the backend
        const response = await fetch(`http://localhost:4000/admin/courses/${courseId}`);
        
        if (!response.ok) {
            throw new Error("Failed to fetch course details.");
        }

        const course = await response.json();

        // Populate the form fields with the course data
        (document.getElementById("name") as HTMLInputElement).value = course.name;
        (document.getElementById("code") as HTMLInputElement).value = course.code;
        (document.getElementById("department") as HTMLSelectElement).value = course.department;
        (document.getElementById("year") as HTMLInputElement).value = course.year.toString();
        (document.getElementById("semester") as HTMLSelectElement).value = course.semester;

    } catch (error) {
        console.error(error);
        alert("An error occurred while fetching the course details.");
    }
});

const updateCourseForm = document.getElementById("updateCourseForm") as HTMLFormElement;

updateCourseForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const courseId = localStorage.getItem("courseId");
    

    if (!courseId) {
        alert("No course ID found. Please try again.");
        return;
    }

    const updatedCourse = {
        name: (document.getElementById("name") as HTMLInputElement).value,
        code: (document.getElementById("code") as HTMLInputElement).value,
        department: (document.getElementById("department") as HTMLSelectElement).value,
        year: parseInt((document.getElementById("year") as HTMLInputElement).value, 10),
        semester: (document.getElementById("semester") as HTMLSelectElement).value,
    };

    try {
        // Send the updated course data to the backend
        const response = await fetch(`http://localhost:4000/admin/courses/${courseId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedCourse),
        });

        if (!response.ok) {
            throw new Error("Failed to update the course.");
        }

        alert("Course updated successfully!");
        window.location.href = "listOfCourses.html";
    } catch (error) {
        console.error(error);
        alert("An error occurred while updating the course.");
    }
});
