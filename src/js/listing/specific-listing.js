import { API_LISTINGS_URL, API_PROFILE_URL, listingId } from "../api/constant-api.mjs";
import { getLocalStorage } from "../localStorage.mjs";
import { apiData } from "../api/apiCall.mjs";
import { listingPage, userCredits } from "../htmlStyle.js";

const method = "GET";

const listingDataUrl = `${API_LISTINGS_URL}/${listingId}` + "?_seller=true&_bids=true";
const profileDataUrl = `${API_PROFILE_URL}/`;

/**
 * Retrieves listing data based on ID and displays it in html.
 * @param {string} listingDataUrl Api url
 * @param {string} method Method (GET) used in the api call
 * @param {string} data The data that is retrieved
 */
async function getListingData(listingDataUrl, method, data) {
  try {
    const listingData = await apiData(listingDataUrl, method, data);
    listingPage(listingData);
  } catch (error) {
    console.log(error);
  }
}

getListingData(listingDataUrl, method);

/**
 * Calls getProfileData after a bid has been placed
 */
function callsGetProfileData() {
  getProfileData(profileDataUrl, method);
}

/**
 * Retrieves a user data and displays it in html.
 * @param {string} profileDataUrl Api url
 * @param {string} method Method (GET) used in the api call
 * @param {string} data The data that is retrieved
 */
async function getProfileData(profileDataUrl, method, data) {
  if (getLocalStorage("profile")) {
    document.getElementById("user-credits").innerText = "";
    const user = getLocalStorage("profile").name;
    const userData = await apiData(profileDataUrl + user, method, data);
    userCredits(userData);
  }
}

getProfileData(profileDataUrl, method);

export { callsGetProfileData };
