/**
 * This function collects the data from a form (login) at submit
 */

import { userLogin } from "../api/auth/login.mjs";

// Referense https://www.youtube.com/watch?v=rLAGHFr8bvU JavaScript 2 Course Assignment - Social Media API

function userLoginFormListener() {
  const userLoginForm = document.querySelector("#userLoginForm");
  if (userLoginForm) {
    userLoginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formSubmission = event.target;
      const submissinData = new FormData(formSubmission);
      const userProfile = Object.fromEntries(submissinData.entries());
      userLogin(userProfile);
    });
  }
}
export { userLoginFormListener };
