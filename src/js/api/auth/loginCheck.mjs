// import { headerSearch } from "../../htmlStyle";
import { getLocalStorage } from "../../localStorage.mjs";
// import { getProfileData } from "../../headerProfile";

const path = location.pathname;
function isUserLogedIn() {
  if (getLocalStorage("token")) {
    document.getElementById("menu-login").style.display = "none";
    document.getElementById("profile").style.display = "block";
    document.getElementById("logout").style.display = "block";
    document.getElementById("main-back-img").className += " menu-logged-in";
    if (path === "/feed/index.html") {
      document.getElementById("place-bid").style.display = "flex";
    } else if (path === `/` || path === `/index.html`) {
      document.getElementById("create-new-auction-btn").style.display = "flex";
      document.getElementById("header-profile").style.display = "flex";
    } else if (path === `/about/index.html`) {
      document.getElementById("header-profile").style.display = "flex";
    }
  } else {
    document.getElementById("menu-login").style.display = "block";
    document.getElementById("profile").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("main-back-img").className += " menu-logged-out";
    if (path === `/feed/index.html`) {
      document.getElementById("place-bid").style.display = "none";
    } else if (path === `/` || path === `/index.html`) {
      console.log("hello");
      document.getElementById("create-new-auction-btn").style.display = "none";
      document.getElementById("header-profile").style.display = "none";
    } else if (path === `/about/index.html`) {
      document.getElementById("header-profile").style.display = "none";
    }
  }
}
isUserLogedIn();

export { isUserLogedIn };
