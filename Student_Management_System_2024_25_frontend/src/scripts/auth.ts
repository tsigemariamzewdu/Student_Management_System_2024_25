//register user
const registrationFormName = document.getElementById(
  "full-name"
) as HTMLInputElement;
const registrationFormEmail = document.getElementById(
  "email"
) as HTMLInputElement;
const schoolId = document.getElementById("schoolId") as HTMLInputElement;
const registrationFormPassword = document.getElementById(
  "password"
) as HTMLInputElement;
const registrationFormConfirmPassword = document.getElementById(
  "confirm"
) as HTMLInputElement;
const registrationFormYear = document.getElementById(
  "year"
) as HTMLInputElement;
const registrationFormDepartment = document.getElementById(
  "department"
) as HTMLInputElement;
const alertSpan = document.getElementById("alert") as HTMLSpanElement;
const registerBtn = document.getElementById("button") as HTMLButtonElement;

registerBtn.addEventListener("click", async () => {
  const name: string = registrationFormName.value;
  const email: string = registrationFormEmail.value || "";
  const password: string = registrationFormPassword.value || "";
  const confirmPassword: string = registrationFormConfirmPassword.value || "";
  const year: string = registrationFormYear.value;
  const department: string = registrationFormDepartment.value;

  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword ||
    !year ||
    !department
  ) {
    alertSpan.innerText = "Please fill all the fields properly";
  } else {
    const data = {
      name,
      email,
      password,
      year,
      department,
      role: "Student",
    };

    console.log("Register user started");

    try {
      const response = await register(data); // Wait for the register function to complete
      console.log(response); // Log the response (or handle it as needed)
    } catch (error) {
      console.error("Error registering user:", error);
      alertSpan.innerText = "Registration failed. Please try again.";
    }
  }
});

async function register(body: {
  name: string;
  email: string;
  password: string;
  department: string;
  year: string;
}) {
  try {
    const BASE_URL = "http://127.0.0.1:4000";
    console.log("api called");
    const response = await fetch(BASE_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...body, year: Number(body.year) }),
    });
    const jsson = await response.json();
    window.location.href = "login.html";
  } catch (error) {
    return error;
  }
}
