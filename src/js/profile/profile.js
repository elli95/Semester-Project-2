import { API_PROFILE_URL } from "../api/constant-api.mjs";
import { apiData } from "../api/apiCall.mjs";
import { getLocalStorage } from "../localStorage.mjs";
import { profileStyle, profileListingsCard } from "../htmlStyle.js";

const method = "GET";
const user = getLocalStorage("profile").name;
const userDataUrl = `${API_PROFILE_URL}/${user}`;

const editProfileBtn = document.querySelector("#edit-profile-btn");
const editProfileForm = document.querySelector("#edit-profile-form");

/**
 * Listens after button clicks to then either show or hide avatar edit field.
 */
editProfileBtn.addEventListener("click", function () {
  if (editProfileForm.style.display === "" || editProfileForm.style.display === "none") {
    editProfileForm.style.display = "flex";
  } else {
    editProfileForm.style.display = "none";
  }
});

/**
 * Retrieves a user data and displays it in html.
 * @param {string} userDataUrl Api url
 * @param {string} method Method (GET) used in the api call
 * @param {string} data The data that is retrieved
 */
async function getProfileData(userDataUrl, method, data) {
  try {
    const userData = await apiData(userDataUrl, method, data);
    const userBids = await apiData(userDataUrl + "/bids?_listings=true", method, data);

    const lastBid = userBids.filter((obj, index) => userBids.findIndex((bid) => bid.listing.id === obj.listing.id) === index);

    profileStyle(userData, lastBid);
  } catch (error) {
    console.log(error);
  }
}

getProfileData(userDataUrl, method);

/**
 * Retrieves a user's own listings and displays them in html.
 * @param {string} userDataUrl Api url
 * @param {string} method Method (GET) used in the api call
 */
async function getProfileListingData(userDataUrl, method) {
  try {
    const listingData = await apiData(userDataUrl + "/listings?_bids=true", method);

    Object.values(listingData).forEach(function (listing) {
      profileListingsCard(listing);
    });
  } catch (error) {
    console.log(error);
  }
}

getProfileListingData(userDataUrl, method);

export { getProfileListingData };
