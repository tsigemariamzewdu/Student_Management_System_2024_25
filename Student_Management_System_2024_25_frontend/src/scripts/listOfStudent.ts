// Function to fetch students from the backend API

async function fetchStudents(department: string, year: string | number) {
  try {
    // Convert year to number if it's a valid number
    const yearParam = year ? Number(year) : "";
    console.log(yearParam)

    const response = await fetch(`http://localhost:4000/admin/students?department=${department}&year=${yearParam}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }
    
    const data = await response.json();
    populateStudentTable(data);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}

// Function to populate the student table with fetched data
function populateStudentTable(students: Array<{ userId: number, year: number, department: string }>) {
  const logoutButton = document.getElementById("logout") as HTMLButtonElement;
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      localStorage.clear()

      window.location.href = 'index.html';
    });
  }
  const tableBody = document.getElementById("studentTableBody") as HTMLTableSectionElement;
  tableBody.innerHTML = ''; // Clear the table before repopulating

  if (students.length === 0) {
    const noDataRow = document.createElement("tr");
    noDataRow.innerHTML = `<td colspan="4" class="text-center">No students found</td>`;
    tableBody.appendChild(noDataRow);
  } else {
    students.forEach(student => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>Student ${student.userId}</td>
        <td>${student.userId}@example.com</td> <!-- For demo, replace with actual email if needed -->
        <td>${student.department}</td>
        <td>${student.year}</td>
      `;
      tableBody.appendChild(row);
    });
  }
}

// Function to handle filtering
function filterStudents() {
  const department = (document.getElementById("department") as HTMLSelectElement).value;
  const year = (document.getElementById("year") as HTMLSelectElement).value;

  if (department || year) {
    fetchStudents(department, year); // Pass year as a string from the form
  } else {
    alert('Please select at least one filter');
  }
}

// Initial population of the student table
// Optionally, you could fetch all students when the page loads
fetchStudents("", ""); // Fetch all students on page load
