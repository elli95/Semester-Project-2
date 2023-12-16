import { authToken } from "./tokenFetch.mjs";

const errorMessage = document.querySelector("#error-message");

/**
 * Retrieves api data based on data from functions that uses this function.
 * @param {string} apiUrl Api url
 * @param {string} method Method used in the api call
 * @param {string} data The data that is retrieved
 * @returns {string}
 */
async function apiData(apiUrl, method, apiData) {
  try {
    const response = await authToken(apiUrl, {
      method,
      body: JSON.stringify(apiData),
    });

    const data = await response.json();

    if (!response.ok) {
      errorMessage.innerText = "";
      errorMessage.innerText = "There was an error: " + data.errors[0].message;
      errorMessage.style.display = "block";
      throw new Error(response.status);
    } else {
      errorMessage.style.display = "none";
    }

    return data;
  } catch (error) {
    event.preventDefault();
    console.log(error);
    errorMessage.innerText = "";
    errorMessage.innerText = "There was an error: " + error;
    errorMessage.style.display = "block";
  }
}

export { apiData };
