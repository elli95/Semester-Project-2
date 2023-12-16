import { API_LISTINGS_SORT_BIDS_URL } from "../api/constant-api.mjs";
import { apiData } from "../api/apiCall.mjs";
import { listingsCard } from "../htmlStyle.js";

const method = "GET";
const listingsDataUrl = `${API_LISTINGS_SORT_BIDS_URL}`;

const searchField = document.querySelector("#search-input");

if (location.pathname === `/` || location.pathname === `/index.html`) {
  searchField.addEventListener("input", listingSearch);
}

/**
 * It retrieves api data, filters data based on query input and displays it on the html page.
 */
async function listingSearch() {
  try {
    const auctionListings = await apiData(listingsDataUrl, method);
    const value = searchField.value.toLowerCase();

    let result = auctionListings.filter((inputText) => inputText.title.toLowerCase().includes(value));

    document.getElementById("listingsSection").innerText = "";
    Object.values(result).forEach(function (listing) {
      const listingsSection = document.getElementById("listingsSection");
      listingsCard(listing, listingsSection);
    });
  } catch (error) {
    console.log(error);
  }
}
