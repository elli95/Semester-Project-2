import { API_PROFILE_URL } from "../api/constant-api.mjs";
import { apiData } from "../api/apiCall.mjs";
import { getLocalStorage } from "../localStorage.mjs";
import { profileStyle, profileListingsCard, profileBidCard, profileWinCard } from "../htmlStyle.js";

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
const endDateSetup = {
  second: "numeric",
  minute: "numeric",
  hour: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

export async function getProfileData(userDataUrl, method, data) {
  try {
    const userData = await apiData(userDataUrl, method, data);

    const userBids = await apiData(userDataUrl + "/bids?_listings=true", method, data);
    const lastBid = userBids.filter((obj, index) => userBids.findIndex((bid) => bid.listing.id === obj.listing.id) === index);

    profileStyle(userData, lastBid);

    const listingData = await apiData(userDataUrl + "/listings?_bids=true", method, data);

    Object.values(listingData).forEach(function (listing) {
      profileListingsCard(listing);
    });

    console.log("ac", lastBid);
    Object.values(lastBid).forEach(function (bidData) {
      const currentDateData = new Date();
      let listingdate = new Date(bidData.listing.endsAt);
      const currentDate = currentDateData.toLocaleString("en-GB", endDateSetup);
      const listingEndDate = listingdate.toLocaleString("en-GB", endDateSetup);

      if (currentDate < listingEndDate) {
        console.log("currentDate", listingEndDate);
        console.log("currentDate", currentDate);
        console.log("activeBids", bidData);

        profileBidCard(bidData);
      }
    });

    if (userData.wins.length > 0) {
      const myWins = userData.wins;
      const auctionWins = userBids.filter((bids) => myWins.includes(bids.listing.id));
      Object.values(auctionWins).forEach(function (winData) {
        profileWinCard(winData);
      });
    } else {
      document.getElementById("my-wins-container").style.display = "none";
      document.getElementById("my-wins-filter").style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}

getProfileData(userDataUrl, method);
