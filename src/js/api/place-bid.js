import { API_LISTINGS_URL } from "./constant-api.mjs";
import { apiData } from "./apiCall.mjs";
import { getBidData } from "../specific-listing.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingId = params.get("id");

const listingBidUrl = `${API_LISTINGS_URL}/${listingId}`;
// console.log(listingDataUrl);

const bidForm = document.querySelector("#place-bid");
const bidValue = document.querySelector("#bid-value");
bidForm.addEventListener("submit", bidSubmission);

async function bidSubmission(event) {
  event.preventDefault();
  try {
    const method = "POST";

    const bidCredit = {
      amount: bidValue.valueAsNumber,
    };

    const bidInfo = await apiData(listingBidUrl + "/bids", method, bidCredit);
    // console.log(bidInfo);

    setTimeout(() => {
      getBidData(listingBidUrl + "?_bids=true");
    }, 500);
  } catch (error) {
    console.log(error);
  }
}
