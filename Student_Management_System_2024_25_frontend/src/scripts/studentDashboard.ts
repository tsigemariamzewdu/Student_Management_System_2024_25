document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout") as HTMLButtonElement;
  
    if (logoutButton) {
      logoutButton.addEventListener("click", async () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('studentId');
        localStorage.removeItem('updatedStudent');
        localStorage.removeItem('userName');
  
        window.location.href = 'index.html';
      });
    }
  });
  