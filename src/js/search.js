import { API_LISTINGS_URL } from "./api/constant-api.mjs";
import { apiData } from "./api/apiCall.mjs";
import { listingsCard, headerSearch } from "./htmlStyle.js";

const method = "GET";
const listingsDataUrl = `${API_LISTINGS_URL}` + "?_bids=true&sort=created";

const searchFieldHeader = document.querySelector("#search-input-header");
const searchField = document.querySelector("#search-input");
searchFieldHeader.addEventListener("input", listingSearchHeader);

if (location.pathname === `/` || location.pathname === `/index.html`) {
  searchField.addEventListener("input", listingSearch);
}

async function listingSearchHeader() {
  try {
    const auctionListings = await apiData(listingsDataUrl, method);
    const value = searchFieldHeader.value.toLowerCase();
    console.log(value);

    let result = auctionListings.filter((inputText) => inputText.title.toLowerCase().includes(value));

    // document.getElementById("listingsSection").innerText = "";
    Object.values(result).forEach(function (listing) {
      headerSearch(listing);
    });
  } catch (error) {
    console.log(error);
  }
}

async function listingSearch() {
  try {
    const auctionListings = await apiData(listingsDataUrl, method);
    const value = searchField.value.toLowerCase();
    console.log(value);

    let result = auctionListings.filter((inputText) => inputText.title.toLowerCase().includes(value));

    document.getElementById("listingsSection").innerText = "";
    Object.values(result).forEach(function (listing) {
      listingsCard(listing);
    });
  } catch (error) {
    console.log(error);
  }
}
