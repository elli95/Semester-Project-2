import { API_REGISTER_URL } from "../constant-api.mjs";

const method = "POST";
const errorMessage = document.querySelector("#error-message");

/**
 * Registers a user in
 * @param {string} profile Profile data from the user
 */
async function userRegistration(profile) {
  const signUpUrl = API_REGISTER_URL;
  const body = JSON.stringify(profile);

  const response = await fetch(signUpUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

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

export { userRegistration };
