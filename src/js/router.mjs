import { registrationListener } from "./handlers/user-register.mjs";
import { loginListener } from "./handlers/user-login.mjs";

/**
 * Selects which function to run based on the web page.
 */
const path = location.pathname;
if (path === "/profile/login.html" || location.pathname === "/profile/login") {
  loginListener();
} else if (path === "/profile/register.html" || location.pathname === "/profile/register") {
  registrationListener();
}
