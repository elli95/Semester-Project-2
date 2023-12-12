import { API_LISTINGS_URL } from "./api/constant-api.mjs";
import { apiData } from "./api/apiCall.mjs";
import { listingsCard } from "./htmlStyle.js";
// import { endingFilter } from "./filter.js";
// import { getCountdownDate } from "./dateCountdown.js";

// console.log("getProfileData", getCountdownDate(endDateCountdown));
const method = "GET";
const listingsDataUrl = `${API_LISTINGS_URL}` + "?_bids=true&sort=created";

const showMoreListingBtn = document.querySelector("#show-more-listing-btn");
const showLessListingBtn = document.querySelector("#show-less-listing-btn");
showMoreListingBtn.addEventListener("click", showAllListing);
showLessListingBtn.addEventListener("click", getProfileDat);
// ?sort=${sortField}&sortOrder=${sortOrder}; &sort=created&sortOrder=asc

const endDateSetup = {
  second: "numeric",
  minute: "numeric",
  hour: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

async function getEndingData(listingsDataUrl, method, data) {
  try {
    const listingsData = await apiData(listingsDataUrl, method, data);
    // const result = listingsData.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));
    const result = listingsData.sort((a, b) => b._count.bids - a._count.bids);
    const limitedResult = result.slice(0, 4);
    Object.values(limitedResult).forEach(function (listing) {
      const listingsSection = document.getElementById("ending-soon");
      listingsCard(listing, listingsSection);
      // listingsCard2(listing);
    });
  } catch (error) {
    console.log(error);
  }
}
getEndingData(listingsDataUrl, method);

async function getProfileData(listingsDataUrl, method) {
  try {
    const listingsData = await apiData(listingsDataUrl, method);
    document.getElementById("listingsSection").innerText = "";
    const limitedResult = listingsData.slice(0, 18);
    Object.values(limitedResult).forEach(function (listing) {
      const listingsSection = document.getElementById("listingsSection");
      listingsCard(listing, listingsSection);
    });
  } catch (error) {
    console.log(error);
  }
}

getProfileData(listingsDataUrl, method);

async function showAllListing() {
  try {
    const listingsData = await apiData(listingsDataUrl, method);
    document.getElementById("listingsSection").innerText = "";
    document.querySelector("#show-more-listing-btn").style.display = "none";
    document.querySelector("#show-less-listing-btn").style.display = "block";
    Object.values(listingsData).forEach(function (listing) {
      const listingsSection = document.getElementById("listingsSection");
      listingsCard(listing, listingsSection);
    });
  } catch (error) {
    console.log(error);
  }
}

async function getProfileDat() {
  try {
    const listingsData = await apiData(listingsDataUrl, method);
    document.getElementById("listingsSection").innerText = "";
    document.querySelector("#show-more-listing-btn").style.display = "block";
    document.querySelector("#show-less-listing-btn").style.display = "none";
    const limitedResult = listingsData.slice(0, 18);
    Object.values(limitedResult).forEach(function (listing) {
      const listingsSection = document.getElementById("listingsSection");
      listingsCard(listing, listingsSection);
    });
  } catch (error) {
    console.log(error);
  }
}

const collectionImg = document.querySelectorAll(".listing-media-input");
for (let i = 0; i < collectionImg.length; i++) {
  collectionImg[i].addEventListener("click", function () {
    console.log(this.value);
    document.getElementById("edit-img-display").src = this.value;
    console.log("hei");
  });
}
