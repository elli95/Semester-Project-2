/**
 * This function collects the data from a form (sign up) at submit
 */

import { signUp } from "../api/auth/registration.mjs";

// Referense https://www.youtube.com/watch?v=rLAGHFr8bvU JavaScript 2 Course Assignment - Social Media API

function signupFormListener() {
  const signUpForm = document.querySelector("#signUpForm");
  if (signUpForm) {
    signUpForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formSubmission = event.target;
      const submissinData = new FormData(formSubmission);
      const userProfile = Object.fromEntries(submissinData.entries());
      signUp(userProfile);
    });
  }
}

export { signupFormListener };
