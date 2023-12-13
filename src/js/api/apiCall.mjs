import { authToken } from "./tokenFetch.mjs";

const errorMessage = document.querySelector("#error-message");

async function apiData(postUrl, method, post) {
  try {
    const response = await authToken(postUrl, {
      method,
      body: JSON.stringify(post),
    });

    const data = await response.json();

    if (!response.ok) {
      errorMessage.innerText = "There was an error: " + data.errors[0].message;
      errorMessage.style.display = "block";
      throw new Error(response.status);
    } else {
      errorMessage.style.display = "none";
    }

    return data;
  } catch (error) {
    // event.preventDefault();
    console.log(error);
    errorMessage.innerText = "There was an error: " + error;
    errorMessage.style.display = "block";
  }
}

export { apiData };
