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
  const BASE_URL = "http://127.0.0.1:4000";
  try {
    console.log("logging user in");
    const response = await fetch(BASE_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    return error;
  }
};
