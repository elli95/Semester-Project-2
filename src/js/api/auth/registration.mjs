import { API_REGISTER_URL } from "../constant-api.mjs";

// const action = "/auth/register";
const method = "POST";
const errorMessage = document.querySelector("#error-message");

/**
 * This function creates a new user on use
 * @param {string} profile The information used to create a new user
 */

async function signUp(profile) {
  const signUpUrl = API_REGISTER_URL;
  const body = JSON.stringify(profile);

  const response = await fetch(signUpUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  console.log(response);

  const data = await response.json();

  if (!response.ok) {
    errorMessage.innerText = "";
    errorMessage.innerText = "There was an error: " + data.errors[0].message;
    errorMessage.style.display = "block";
    throw new Error(response.status);
  } else {
    const signUpForm = document.querySelector("#signUpForm");
    const signUpSuccess = document.querySelector(".register-success");
    signUpForm.className = "editForm";
    signUpSuccess.className = "d-flex flex-column gap-2 p-2 align-items-center ";
  }
}

export { signUp };
