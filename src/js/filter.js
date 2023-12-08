import { API_LISTINGS_URL } from "./api/constant-api.mjs";
import { apiData } from "./api/apiCall.mjs";
import { listingsCard } from "./htmlStyle.js";

const method = "GET";
const listingsDataUrl = `${API_LISTINGS_URL}` + "?_bids=true&sort=created";

const newPost = document.querySelector("#new-post");
const oldPost = document.querySelector("#old-post");
const popularPost = document.querySelector("#popular-post");

newPost.addEventListener("click", newFilter);
oldPost.addEventListener("click", endingFilter);
popularPost.addEventListener("click", popularFilter);

async function newFilter() {
  try {
    const listingData = await apiData(listingsDataUrl, method);
    const result = listingData.sort((a, b) => new Date(b.created) - new Date(a.created));
    printFilterResult(result);
  } catch (error) {
    console.log(error);
  }
}

const endDateSetup = {
  second: "numeric",
  minute: "numeric",
  hour: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

async function endingFilter() {
  try {
    const listingData = await apiData(listingsDataUrl, method);
    const result = listingData.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));

    document.getElementById("listingsSection").innerText = "";

    Object.values(result).forEach(function (listing) {
      const currentDateData = new Date();
      const ListingEndsAt = new Date(listing.endsAt);
      const currentDate = currentDateData.toLocaleString("en-GB", endDateSetup);
      const listingEndDate = ListingEndsAt.toLocaleString("en-GB", endDateSetup);
      if (currentDate < listingEndDate) {
        listingsCard(listing);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function popularFilter() {
  try {
    const listingData = await apiData(listingsDataUrl, method);
    const result = listingData.sort((a, b) => b._count.bids - a._count.bids);
    printFilterResult(result);
  } catch (error) {
    console.log(error);
  }
}

function printFilterResult(result) {
  document.getElementById("listingsSection").innerText = "";
  Object.values(result).forEach(function (listing) {
    listingsCard(listing);
  });
}
