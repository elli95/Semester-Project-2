import { API_LISTINGS_URL, API_PROFILE_URL } from "./api/constant-api.mjs";
import { getLocalStorage } from "./localStorage.mjs";
import { apiData } from "./api/apiCall.mjs";
import { listingPage, userCredits, bidsList } from "./htmlStyle.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingId = params.get("id");

const method = "GET";

const listingDataUrl = `${API_LISTINGS_URL}/${listingId}` + "?_seller=true&_bids=true";
// console.log("123", listingDataUrl);

async function getProfileData(listingDataUrl, method, data) {
  try {
    const listingData = await apiData(listingDataUrl, method, data);
    listingPage(listingData);
    // console.log(listingData);

    if (getLocalStorage("profile")) {
      const user = getLocalStorage("profile").name;
      const userData = await apiData(`${API_PROFILE_URL}/${user}`, method, data);
      userCredits(userData);
    }
  } catch (error) {
    console.log(error);
  }
}

getProfileData(listingDataUrl, method);

const showMoreBtn = document.querySelector(".show-more");
showMoreBtn.addEventListener("click", showMoreBids);

function showMoreBids() {
  console.log("hello");
  // const listingBids = document.querySelector(".listing-bids");
  if (showMoreBtn.innerText === "Show all bids") {
    document.getElementById("listing-bids").style.height = "fit-content";
    showMoreBtn.innerText = "Show less bids";
  } else {
    document.getElementById("listing-bids").style.height = "125px";
    showMoreBtn.innerText = "Show all bids";
  }
}

export async function getBidData(listingDataUrl, method, data) {
  try {
    document.getElementById("listing-bids").innerHTML = "";
    const listingData = await apiData(listingDataUrl, method, data);
    if (listingData.bids.length < 4) {
      showMoreBtn.style.display = "none";
    }
    // console.log("listingData", listingData._count.bids);
    let bidListCollection = [];
    bidListCollection.push(listingData.bids);
    const highestBid = bidListCollection[0].sort((a, b) => b.amount - a.amount);

    Object.values(highestBid).forEach(function (bidsData) {
      bidsList(bidsData);
    });
  } catch (error) {
    console.log(error);
  }
}

getBidData(listingDataUrl, method);
