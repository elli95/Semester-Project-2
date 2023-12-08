/**
 * This router helps to decide which file to call based on path name
 */
import { signupFormListener } from "./handlers/user-register.mjs";
import { userLoginFormListener } from "./handlers/user-login.mjs";

const path = location.pathname;
if (path === "/profile/login.html") {
  userLoginFormListener();
} else if (path === "/profile/register.html") {
  signupFormListener();
}
