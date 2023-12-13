import { API_PROFILE_URL } from "../api/constant-api.mjs";
import { apiData } from "../api/apiCall.mjs";
import { getLocalStorage } from "../localStorage.mjs";
import { profileBidCard, profileWinCard } from "../htmlStyle.js";
import { getProfileListingData } from "./profile.js";

const method = "GET";
const user = getLocalStorage("profile").name;
const userDataUrl = `${API_PROFILE_URL}/${user}`;
const urlEnd = "/bids?_listings=true";

const myBidsFilter = document.querySelector("#my-bids-filter");
const myListingsFilter = document.querySelector("#my-listings-filter");
const myWinsFilter = document.querySelector("#my-wins-filter");

myBidsFilter.addEventListener("click", myBids);
myListingsFilter.addEventListener("click", myListings);
myWinsFilter.addEventListener("click", myWins);

async function myListings() {
  try {
    document.getElementById("my-listings-filter").style.color = "var(--white-color)";
    document.getElementById("my-listings-filter").style.backgroundColor = "var(--btn-color)";
    document.getElementById("my-bids-filter").style.color = "var(--black-color)";
    document.getElementById("my-bids-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("my-wins-filter").style.color = "var(--black-color)";
    document.getElementById("my-wins-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("listingsSection").innerText = "";

    getProfileListingData(userDataUrl, method);
  } catch (error) {
    console.log(error);
  }
}

async function myBids() {
  try {
    const userBids = await apiData(userDataUrl + urlEnd, method);

    const lastBid = userBids.filter((obj, index) => userBids.findIndex((bid) => bid.listing.id === obj.listing.id) === index);

    document.getElementById("my-listings-filter").style.color = "var(--black-color)";
    document.getElementById("my-listings-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("my-bids-filter").style.color = "var(--white-color)";
    document.getElementById("my-bids-filter").style.backgroundColor = "var(--btn-color)";
    document.getElementById("my-wins-filter").style.color = "var(--black-color)";
    document.getElementById("my-wins-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("listingsSection").innerText = "";

    Object.values(lastBid).forEach(function (bidData) {
      const currentDate = new Date();
      let listingEndDate = new Date(bidData.listing.endsAt);

      if (currentDate < listingEndDate) {
        profileBidCard(bidData);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function myWins() {
  try {
    const userData = await apiData(userDataUrl, method);
    const userBids = await apiData(userDataUrl + urlEnd, method);

    const myWins = userData.wins;
    const auctionWins = userBids.filter((bids) => myWins.includes(bids.listing.id));

    document.getElementById("my-listings-filter").style.color = "var(--black-color)";
    document.getElementById("my-listings-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("my-bids-filter").style.color = "var(--black-color)";
    document.getElementById("my-bids-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("my-wins-filter").style.color = "var(--white-color)";
    document.getElementById("my-wins-filter").style.backgroundColor = "var(--btn-color)";
    document.getElementById("listingsSection").innerText = "";

    Object.values(auctionWins).forEach(function (winData) {
      profileWinCard(winData);
    });
  } catch (error) {
    console.log(error);
  }
}
