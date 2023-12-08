import { getLocalStorage } from "../localStorage.mjs";

function apiHeaders() {
  const accessToken = getLocalStorage("token");
  // console.log("accessToken", accessToken);

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
}

async function authToken(url, options) {
  return fetch(url, {
    ...options,
    headers: apiHeaders(),
  });
}

export { apiHeaders, authToken };
