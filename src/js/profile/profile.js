import { API_PROFILE_URL } from "../api/constant-api.mjs";
import { apiData } from "../api/apiCall.mjs";
import { getLocalStorage } from "../localStorage.mjs";
import { profileStyle, profileListingsCard, profileBidCard } from "../htmlStyle.js";

const method = "GET";
const user = getLocalStorage("profile").name;
const userDataUrl = `${API_PROFILE_URL}/${user}`;

const editProfileBtn = document.querySelector("#edit-profile-btn");
const editProfileForm = document.querySelector("#edit-profile-form");
editProfileBtn.addEventListener("click", function () {
  if (editProfileForm.style.display === "" || editProfileForm.style.display === "none") {
    editProfileForm.style.display = "flex";
  } else {
    editProfileForm.style.display = "none";
  }
});

// console.log("userDataUrl", userDataUrl + "/bids");

export async function getProfileData(userDataUrl, method, data) {
  try {
    const userData = await apiData(userDataUrl, method, data);
    console.log("test", userData);
    // const userData = await apiData(userDataUrl + "?_listings=true", method, data);

    const userBids = await apiData(userDataUrl + "/bids?_listings=true", method, data);
    const lastBid = userBids.filter((obj, index) => userBids.findIndex((bid) => bid.listing.id === obj.listing.id) === index);
    // console.log("bid amounsst", userBids);
    profileStyle(userData, lastBid);

    const listingData = await apiData(userDataUrl + "/listings?_bids=true", method, data);
    console.log("userData", userData);

    Object.values(listingData).forEach(function (listing) {
      profileListingsCard(listing);
    });

    Object.values(lastBid).forEach(function (bidData) {
      profileBidCard(bidData);
    });
  } catch (error) {
    console.log(error);
  }
}

getProfileData(userDataUrl, method);
