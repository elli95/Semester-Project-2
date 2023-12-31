import { getLocalStorage } from "../../localStorage.mjs";

const path = location.pathname;

/**
 * Checks whether the user is logged in or not, and changes the appearance based on the result
 */
function isUserLogedIn() {
  if (getLocalStorage("token")) {
    document.getElementById("menu-login").style.display = "none";
    document.getElementById("profile").style.display = "block";
    document.getElementById("logout").style.display = "block";
    document.getElementById("main-back-img").className += " menu-logged-in";

    if (path === "/listing/index.html") {
      document.getElementById("place-bid").style.display = "flex";
    } else if (path === `/` || path === `/index.html`) {
      document.getElementById("create-new-auction-btn").style.display = "flex";
    }

    if (path !== `/profile/login.html` || path !== `/profile/register.html`) {
      document.getElementById("header-profile").style.display = "flex";
    }
  } else {
    document.getElementById("menu-login").style.display = "block";
    document.getElementById("profile").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("main-back-img").className += " menu-logged-out";

    if (path === `/listing/index.html`) {
      document.getElementById("place-bid").style.display = "none";
    } else if (path === `/` || path === `/index.html`) {
      document.getElementById("create-new-auction-btn").style.display = "none";
    }

    if (path !== `/profile/login.html` || path !== `/profile/register.html`) {
      document.getElementById("header-profile").style.display = "none";
    }
  }
}
isUserLogedIn();

export { isUserLogedIn };
