import { API_LISTINGS_SORT_BIDS_URL } from "./api/constant-api.mjs";
import { apiData } from "./api/apiCall.mjs";
import { popularListingsCard, listingsCard, diplayButtonStyle } from "./htmlStyle.js";

const method = "GET";
const listingsDataUrl = `${API_LISTINGS_SORT_BIDS_URL}`;

const showMoreListingBtn = document.querySelector("#show-more-listing-btn");
const showLessListingBtn = document.querySelector("#show-less-listing-btn");
showMoreListingBtn.addEventListener("click", showAllListing);
showLessListingBtn.addEventListener("click", getLimitedListingData);

/**
 * Retrieves a limited amount of api data, based on popularity (most bids)
 * @param {string} listingsDataUrl Api url
 * @param {string} method Method (GET) used in the api call
 * @param {string} data The data that is retrieved
 */
async function getPopulareNow(listingsDataUrl, method, data) {
  try {
    const listingsData = await apiData(listingsDataUrl, method, data);
    const result = listingsData.sort((a, b) => b._count.bids - a._count.bids);

    const limitedResult = result.slice(0, 4);

    const activListing = limitedResult[0].id;

    Object.values(limitedResult).forEach(function (listing) {
      popularListingsCard(listing, activListing);
    });
  } catch (error) {
    console.log(error);
  }
}
getPopulareNow(listingsDataUrl, method);

/**
 * Calls function and retrieves/displays listing data.
 * @param {string} listingsDataUrl Api url
 * @param {string} method Method (GET) used in the api call
 */
function getListingData(listingsDataUrl, method) {
  getLimitedListingData(listingsDataUrl, method);
}

getListingData(listingsDataUrl, method);

/**
 * Show limited entries (Possibly from button click) based on api call
 */
async function getLimitedListingData() {
  try {
    diplayButtonStyle();
    document.querySelector("#show-more-listing-btn").style.display = "block";

    const listingsData = await apiData(listingsDataUrl + "&limit=18", method);
    document.getElementById("listingsSection").innerText = "";

    Object.values(listingsData).forEach(function (listing) {
      listingsCard(listing);
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Show all entries when you click the button based on api call
 */
async function showAllListing() {
  try {
    diplayButtonStyle();
    document.querySelector("#show-less-listing-btn").style.display = "block";

    const listingsData = await apiData(listingsDataUrl, method);
    document.getElementById("listingsSection").innerText = "";

    Object.values(listingsData).forEach(function (listing) {
      listingsCard(listing);
    });
  } catch (error) {
    console.log(error);
  }
}

export { getLimitedListingData };
