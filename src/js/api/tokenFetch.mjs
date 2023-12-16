import { getLocalStorage } from "../localStorage.mjs";

/**
 * Get header data by api call
 * @returns {string} Content-Type and Authorization data
 */
function apiHeaders() {
  const accessToken = getLocalStorage("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}

/**
 * Part of the api call to retrieve api data
 * @param {string} url Api url
 * @param {string} options Method, data, body and other options needed
 * @returns {string} Returns the result based on the values it receives
 */
async function authToken(url, options) {
  return fetch(url, {
    ...options,
    headers: apiHeaders(),
  });
}

export { apiHeaders, authToken };
