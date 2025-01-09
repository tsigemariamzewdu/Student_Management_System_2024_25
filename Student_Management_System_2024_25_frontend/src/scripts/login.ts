//login user fields
const loginEmailField = document.getElementById("email") as HTMLInputElement;
const loginPasswordField = document.getElementById(
  "password"
) as HTMLInputElement;
const loginButton = document.getElementById("login-btn") as HTMLButtonElement;

loginButton.addEventListener("click", () => {
  const email = loginEmailField.value;
  const password = loginPasswordField.value;
  const response = login({ email, password });
  console.log(response);
});


const login = async (credentials: { email: string; password: string }) => {
  const BASE_URL = "http://localhost:4000";
  try {
    console.log("logging user in");
    const response = await fetch(BASE_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    // Parse the JSON response
    const responseJson = await response.json();

    // Check if the accessToken is present
    if (responseJson.role=="admin") {
      window.location.href="adminDashboard.html";
    return }

    if(responseJson){

      // Store the accessToken in localStorage
      localStorage.setItem("accessToken", responseJson.accessToken);
      localStorage.setItem("userName", responseJson.name);  
      localStorage.setItem("userId", responseJson.id.toString()); 
      localStorage.setItem("studentId",responseJson.studnetId.toString()) 
      console.log("Access token saved to localStorage");
      window.location.href="studnetDashboard.html"
      
        

      }
      else {
      console.error("Login failed: No access token received");
    }

    return responseJson;
  } catch (error) {
    console.error("Error during login:", error);
    return error;
  }
};


