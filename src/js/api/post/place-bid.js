import { API_LISTINGS_URL, listingId } from "../constant-api.mjs";
import { apiData } from "../apiCall.mjs";
import { getBidData } from "../../listing/listingBids.js";

const listingBidUrl = `${API_LISTINGS_URL}/${listingId}`;

const bidForm = document.querySelector("#place-bid");
const bidValue = document.querySelector("#bid-value");
bidForm.addEventListener("submit", bidSubmission);

/**
 * Submit a bid for listing to api
 */
async function bidSubmission() {
  event.preventDefault();
  try {
    const confirmBid = confirm("Are you sure you want to bid this auction?");
    if (confirmBid) {
      const method = "POST";

      const bidCredit = {
        amount: bidValue.valueAsNumber,
      };

      const bidInfo = await apiData(listingBidUrl + "/bids", method, bidCredit);

      setTimeout(() => {
        document.getElementById("listing-bids").innerHTML = "";
        getBidData(listingBidUrl + "?_bids=true");
      }, 500);
    }
  } catch (error) {
    console.log(error);
  }
}
