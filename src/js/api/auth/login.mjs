import { API_LOGIN_URL } from "../constant-api.mjs";
import { setLocalStorage } from "../../localStorage.mjs";

const method = "POST";
const errorMessage = document.querySelector("#error-message");

console.log(API_LOGIN_URL);

/**
 * This function logs in a user
 * @param {string} profile User data of those who log in
 */

async function userLogin(profile) {
  const userLoginUrl = API_LOGIN_URL;
  const body = JSON.stringify(profile);

  const response = await fetch(userLoginUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const { accessToken, ...userProfile } = await response.json();
  setLocalStorage("token", accessToken);
  setLocalStorage("profile", userProfile);

  if (!response.ok) {
    errorMessage.innerText = "";
    errorMessage.innerText = "There was an error: " + userProfile.errors[0].message;
    errorMessage.style.display = "block";
  } else {
    errorMessage.style.display = "none";
    window.location.replace("../../../../profile/index.html");
  }
}

export { userLogin };
