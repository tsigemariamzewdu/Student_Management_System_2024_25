// Attach an event listener to the form submission
document.getElementById('createCourseForm')!.addEventListener('submit', async (event: Event) => {
    event.preventDefault(); // Prevent the default form submission
  
    // Collect form data with type safety
    const courseData = {
      name: (document.getElementById('name') as HTMLInputElement).value,
      code: (document.getElementById('code') as HTMLInputElement).value,
      department: (document.getElementById('department') as HTMLSelectElement).value,
      year: parseInt((document.getElementById('year') as HTMLInputElement).value, 10),
      semester: (document.getElementById('semester') as HTMLSelectElement).value,
    };
  
    try {
      const response: Response = await fetch('http://localhost:4000/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });
  
      if (response.ok) {
        alert('Course added successfully!');
        (document.getElementById('createCourseForm') as HTMLFormElement).reset();
      } else {
        const error = await response.json();
        alert(`Failed to add course: ${error.message}`);
      }
    } catch (err) {
      console.error('Error adding course:', err);
      alert('An error occurred while adding the course.');
    }
  });
  