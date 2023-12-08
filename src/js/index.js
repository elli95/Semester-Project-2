import { API_LISTINGS_URL } from "./api/constant-api.mjs";
import { apiData } from "./api/apiCall.mjs";
import { listingsCard } from "./htmlStyle.js";
// import { getCountdownDate } from "./dateCountdown.js";

// console.log("getProfileData", getCountdownDate(endDateCountdown));
const method = "GET";
const listingsDataUrl = `${API_LISTINGS_URL}` + "?_bids=true&sort=created";

// ?sort=${sortField}&sortOrder=${sortOrder}; &sort=created&sortOrder=asc
async function getProfileData(listingsDataUrl, method, data) {
  try {
    const listingsData = await apiData(listingsDataUrl, method, data);
    Object.values(listingsData).forEach(function (listing) {
      // const listingdate = new Date(listing.endsAt).getTime();
      // console.log("123", listing);

      // setInterval(function () {
      // const listingsDate = getCountdownDate(listingdate);
      //   console.log("123", listingsDate);
      listingsCard(listing);
      // }, 1000);
    });
  } catch (error) {
    console.log(error);
  }
}

getProfileData(listingsDataUrl, method);
