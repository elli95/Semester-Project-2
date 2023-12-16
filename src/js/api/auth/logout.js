import { deleteThisLocalStorage } from "../../localStorage.mjs";
import { isUserLogedIn } from "./loginCheck.mjs";

const logout = document.querySelector("#logout");
logout.addEventListener("click", userLogout);

/**
 * Clears the security code, logs the user out and sends them to the main page if they are on the profile page, and calls the isUserLoggedIn function to refresh the page based on login status
 */
const path = location.pathname;
function userLogout() {
  deleteThisLocalStorage("token");
  deleteThisLocalStorage("profile");
  if (path === "/profile/index.html" || path === "/profile/edit-listing.html") {
    window.location.replace("/");
  }
  isUserLogedIn();
}
