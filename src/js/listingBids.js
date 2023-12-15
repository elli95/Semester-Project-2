import { API_LISTINGS_URL, listingId } from "./api/constant-api.mjs";
import { apiData } from "./api/apiCall.mjs";
import { bidsList } from "./htmlStyle.js";

const method = "GET";

const listingDataUrl = `${API_LISTINGS_URL}/${listingId}` + "?_seller=true&_bids=true";

const showMoreBtn = document.querySelector(".show-more");
showMoreBtn.addEventListener("click", showMoreBids);

function showMoreBids() {
  if (showMoreBtn.innerText === "Show all bids") {
    document.getElementById("listing-bids").style.height = "fit-content";
    showMoreBtn.innerText = "Show less bids";
  } else {
    document.getElementById("listing-bids").style.height = "125px";
    showMoreBtn.innerText = "Show all bids";
  }
}

async function getBidData(listingDataUrl, method, data) {
  try {
    const listingData = await apiData(listingDataUrl, method, data);

    if (listingData.bids.length < 4) {
      showMoreBtn.style.display = "none";
    }

    let bidListCollection = [];
    bidListCollection.push(listingData.bids);

    const highestBid = bidListCollection[0].sort((a, b) => b.amount - a.amount);

    if (highestBid.length > 0) {
      document.getElementById("bid-value").min = highestBid[0].amount + 1;
    } else {
      document.getElementById("bid-value").min = 1;
    }

    Object.values(highestBid).forEach(function (bidsData) {
      bidsList(bidsData);
    });
  } catch (error) {
    console.log(error);
  }
}

getBidData(listingDataUrl, method);

export { getBidData };
