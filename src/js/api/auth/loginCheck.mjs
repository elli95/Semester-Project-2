import { getLocalStorage } from "../../localStorage.mjs";

const path = location.pathname;
function isUserLogedIn() {
  if (getLocalStorage("token")) {
    document.getElementById("menu-login").style.display = "none";
    document.getElementById("profile").style.display = "block";
    document.getElementById("logout").style.display = "block";
    if (path === "/feed/index.html") {
      document.getElementById("place-bid").style.display = "flex";
    }
    // else if (path === `/` || path === `/index.html`) {
    //   document.getElementById("listing-form").style.display = "flex";
    // }
  } else {
    document.getElementById("menu-login").style.display = "block";
    document.getElementById("profile").style.display = "none";
    document.getElementById("logout").style.display = "none";
    if (path === `/feed/index.html`) {
      document.getElementById("place-bid").style.display = "none";
    }
    // else if (path === `/` || path === `/index.html`) {
    //   document.getElementById("listing-form").style.display = "none";
    // }
  }
}
isUserLogedIn();

export { isUserLogedIn };
