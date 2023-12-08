import { deleteKeyLocalStorage } from "../../localStorage.mjs";
import { isUserLogedIn } from "./loginCheck.mjs";

const logout = document.querySelector("#logout");
logout.addEventListener("click", userLogout);

/**
 * Deletes the security code and logout the user
 */

const path = location.pathname;
function userLogout() {
  deleteKeyLocalStorage("token");
  deleteKeyLocalStorage("profile");
  if (path === "/profile/index.html") {
    window.location.replace("/");
  }
  isUserLogedIn();
}
