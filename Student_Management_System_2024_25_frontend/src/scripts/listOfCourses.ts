// app.ts

// Fetch courses data from the API
const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:4000/admin/courses'); // Replace with your API endpoint
      const courses = await response.json();
  
      const coursesTableBody = document.getElementById('coursesTableBody') as HTMLTableSectionElement;
      coursesTableBody.innerHTML = ''; // Clear any existing rows
  
      courses.forEach((course: {
        id: number,
        name: string,
        code: string,
        department: string,
        year: number,
        semester: string
      }) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
          <td>${course.name}</td>
          <td>${course.code}</td>
          <td>${course.department}</td>
          <td>${course.year}</td>
          <td>${course.semester}</td>
          <td>
            <button class="btn btn-warning" onclick="updateCourse(${course.id})">Update</button>
            <button class="btn btn-danger" onclick="deleteCourse(${course.id})">Delete</button>
          </td>
        `;
        coursesTableBody.appendChild(row);
      });
    } catch (error) {
      console.error('There was an error fetching the courses:', error);
    }
  };
  
  // Handle add new course action
  const addCourse = () => {
    // Redirect to the add course form or show a modal
    console.log('Redirecting to add new course form');
  };
  
  // Handle update course action
  const updateCourse = (courseId: number) => {
    // Redirect to the update form with the course data
    console.log(`Redirecting to update course ${courseId}`);
    window.location.href="updateCourse.html";
    localStorage.setItem("courseId",courseId.toString())
    
  };
  
  // Handle delete course action
  const deleteCourse = async (courseId: number) => {
    try {
      const response = await fetch(`http://localhost:4000/admin/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
  
      alert('Course deleted successfully');
      fetchCourses(); // Refresh the course list
    } catch (error) {
      console.error('There was an error deleting the course:', error);
    }
  };
  
  // Set up event listeners after DOM content is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById("logout") as HTMLButtonElement;
    if (logoutButton) {
      logoutButton.addEventListener("click", async () => {
        localStorage.clear()
  
        window.location.href = 'index.html';
      });
    }

    // Fetch courses on initial load
    fetchCourses();
  
    // Add event listener for add new course button
    const addCourseBtn = document.getElementById('addCourseBtn') as HTMLButtonElement;
    addCourseBtn.addEventListener('click', addCourse);
  });
  