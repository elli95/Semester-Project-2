import { userRegistration } from "../api/auth/registration.mjs";

// Referense https://www.youtube.com/watch?v=rLAGHFr8bvU JavaScript 2 Course Assignment - Social Media API
// Referense https://github.com/elli95/JavaScript-2-Course-assignment/tree/js2 My own JavaScript 2 Course assignment

/**
 * This function retrieves data from the registration form when submitting.
 */
function registrationListener() {
  const signUpForm = document.querySelector("#signUpForm");
  if (signUpForm) {
    signUpForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formSubmission = event.target;
      const submissinData = new FormData(formSubmission);
      const userProfile = Object.fromEntries(submissinData.entries());
      userRegistration(userProfile);
    });
  }
}

export { registrationListener };
