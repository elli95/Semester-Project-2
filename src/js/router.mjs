import { signupFormListener } from "./handlers/user-register.mjs";
import { userLoginFormListener } from "./handlers/user-login.mjs";

/**
 * Selects which function to run based on the web page.
 */
const path = location.pathname;
if (path === "/profile/login.html" || location.pathname === "/profile/login") {
  userLoginFormListener();
} else if (path === "/profile/register.html" || location.pathname === "/profile/register") {
  signupFormListener();
}
