import { API_LISTINGS_URL } from "../api/constant-api.mjs";
import { apiData } from "../api/apiCall.mjs";
import { listingsCard } from "../htmlStyle.js";
import { diplayButtonStyle } from "../htmlStyle.js";
import { getLimitedListingData } from "../index.js";

const method = "GET";
const listingsDataUrl = `${API_LISTINGS_URL}` + "?_bids=true&sort=created";

const newListing = document.querySelector("#new-listing");
const endingSoon = document.querySelector("#ending-soon-filter");
const popularListing = document.querySelector("#popular-listing");

newListing.addEventListener("click", newFilter);
endingSoon.addEventListener("click", getLimitedEndingFilter);
popularListing.addEventListener("click", getLimitedPopularFilter);

const showLessEndingBtn = document.querySelector("#show-less-ending-btn");
const showMoreEndingBtn = document.querySelector("#show-more-ending-btn");
const showLessPopularBtn = document.querySelector("#show-less-popular-btn");
const showMorePopularBtn = document.querySelector("#show-more-popular-btn");

showLessEndingBtn.addEventListener("click", getLimitedEndingFilter);
showMoreEndingBtn.addEventListener("click", getAllEndingFilter);
showLessPopularBtn.addEventListener("click", getLimitedPopularFilter);
showMorePopularBtn.addEventListener("click", getAllPopularFilter);

async function newFilter() {
  try {
    filterMenuStyle();
    document.getElementById("new-listing").style.color = "var(--white-color)";
    document.getElementById("new-listing").style.backgroundColor = "var(--btn-color)";
    getLimitedListingData();
    // diplayButtonStyle();
    // document.querySelector("#show-more-listing-btn").style.display = "block";

    // const listingData = await apiData(listingsDataUrl + "&limit=18", method);
    // const result = listingData.sort((a, b) => new Date(b.created) - new Date(a.created));

    // printFilterResult(result);
  } catch (error) {
    console.log(error);
  }
}

async function getLimitedEndingFilter() {
  try {
    filterMenuStyle();
    document.getElementById("ending-soon-filter").style.color = "var(--white-color)";
    document.getElementById("ending-soon-filter").style.backgroundColor = "var(--btn-color)";

    diplayButtonStyle();
    document.querySelector("#show-more-ending-btn").style.display = "block";

    const listingData = await apiData(listingsDataUrl, method);
    const result = listingData.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
    const limitedResult = result.slice(0, 18);

    document.getElementById("listingsSection").innerText = "";

    Object.values(limitedResult).forEach(function (listing) {
      const currentDate = new Date();
      const listingEndDate = new Date(listing.endsAt);
      if (currentDate < listingEndDate) {
        const listingsSection = document.getElementById("listingsSection");
        listingsCard(listing, listingsSection);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function getAllEndingFilter() {
  try {
    diplayButtonStyle();
    document.querySelector("#show-less-ending-btn").style.display = "block";

    const listingData = await apiData(listingsDataUrl, method);
    const result = listingData.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));

    Object.values(result).forEach(function (listing) {
      const currentDate = new Date();
      const listingEndDate = new Date(listing.endsAt);
      if (currentDate < listingEndDate) {
        const listingsSection = document.getElementById("listingsSection");
        listingsCard(listing, listingsSection);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function getLimitedPopularFilter() {
  try {
    filterMenuStyle();
    document.getElementById("popular-listing").style.color = "var(--white-color)";
    document.getElementById("popular-listing").style.backgroundColor = "var(--btn-color)";

    diplayButtonStyle();
    document.querySelector("#show-more-popular-btn").style.display = "block";

    const listingData = await apiData(listingsDataUrl, method);
    const result = listingData.sort((a, b) => b._count.bids - a._count.bids);
    const limitedResult = result.slice(0, 18);

    printFilterResult(limitedResult);
  } catch (error) {
    console.log(error);
  }
}

async function getAllPopularFilter() {
  try {
    diplayButtonStyle();
    document.querySelector("#show-less-popular-btn").style.display = "block";

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
    const listingsSection = document.getElementById("listingsSection");
    listingsCard(listing, listingsSection);
  });
}

function filterMenuStyle() {
  document.getElementById("new-listing").style.color = "var(--black-color)";
  document.getElementById("new-listing").style.backgroundColor = "var(--listing-color)";
  document.getElementById("ending-soon-filter").style.color = "var(--black-color)";
  document.getElementById("ending-soon-filter").style.backgroundColor = "var(--listing-color)";
  document.getElementById("popular-listing").style.color = "var(--black-color)";
  document.getElementById("popular-listing").style.backgroundColor = "var(--listing-color)";
}
