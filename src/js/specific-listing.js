import { API_LISTINGS_URL, API_PROFILE_URL, listingId } from "./api/constant-api.mjs";
import { getLocalStorage } from "./localStorage.mjs";
import { apiData } from "./api/apiCall.mjs";
import { listingPage, userCredits } from "./htmlStyle.js";

const method = "GET";

const listingDataUrl = `${API_LISTINGS_URL}/${listingId}` + "?_seller=true&_bids=true";
const profileDataUrl = `${API_PROFILE_URL}/`;

async function getListingData(listingDataUrl, method, data) {
  try {
    const listingData = await apiData(listingDataUrl, method, data);
    listingPage(listingData);
  } catch (error) {
    console.log(error);
  }
}

getListingData(listingDataUrl, method);

async function getProfileData(profileDataUrl, method, data) {
  if (getLocalStorage("profile")) {
    const user = getLocalStorage("profile").name;
    const userData = await apiData(profileDataUrl + user, method, data);
    userCredits(userData);
  }
}

getProfileData(profileDataUrl, method);
