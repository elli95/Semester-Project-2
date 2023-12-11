import { API_LISTINGS_URL } from "./api/constant-api.mjs";
import { apiData } from "./api/apiCall.mjs";
import { listingsCard } from "./htmlStyle.js";

const method = "GET";
const listingsDataUrl = `${API_LISTINGS_URL}` + "?_bids=true&sort=created";

const newListing = document.querySelector("#new-listing");
const endingSoon = document.querySelector("#ending-soon-filter");
const popularListing = document.querySelector("#popular-listing");
const lowPrice = document.querySelector("#low-price");
const highPrice = document.querySelector("#high-price");

newListing.addEventListener("click", newFilter);
endingSoon.addEventListener("click", endingFilter);
popularListing.addEventListener("click", popularFilter);
lowPrice.addEventListener("click", lowFilter);
highPrice.addEventListener("click", highFilter);

async function newFilter() {
  try {
    const listingData = await apiData(listingsDataUrl, method);
    const result = listingData.sort((a, b) => new Date(b.created) - new Date(a.created));

    document.getElementById("new-listing").style.backgroundColor = "#72f88d";
    document.getElementById("ending-soon-filter").style.backgroundColor = "#bfedce";
    document.getElementById("popular-listing").style.backgroundColor = "#bfedce";
    document.getElementById("low-price").style.backgroundColor = "#bfedce";
    document.getElementById("high-price").style.backgroundColor = "#bfedce";

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

export async function endingFilter() {
  try {
    const listingData = await apiData(listingsDataUrl, method);
    const result = listingData.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));

    document.getElementById("new-listing").style.backgroundColor = "#bfedce";
    document.getElementById("ending-soon-filter").style.backgroundColor = "#72f88d";
    document.getElementById("popular-listing").style.backgroundColor = "#bfedce";
    document.getElementById("low-price").style.backgroundColor = "#bfedce";
    document.getElementById("high-price").style.backgroundColor = "#bfedce";

    document.getElementById("listingsSection").innerText = "";

    Object.values(result).forEach(function (listing) {
      const currentDateData = new Date();
      const ListingEndsAt = new Date(listing.endsAt);
      const currentDate = currentDateData.toLocaleString("en-GB", endDateSetup);
      const listingEndDate = ListingEndsAt.toLocaleString("en-GB", endDateSetup);
      if (currentDate < listingEndDate) {
        listingsCard(listing);
        // return "test";
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

    console.log(result);
    document.getElementById("new-listing").style.backgroundColor = "#bfedce";
    document.getElementById("ending-soon-filter").style.backgroundColor = "#bfedce";
    document.getElementById("popular-listing").style.backgroundColor = "#72f88d";
    document.getElementById("low-price").style.backgroundColor = "#bfedce";
    document.getElementById("high-price").style.backgroundColor = "#bfedce";
    printFilterResult(result);
  } catch (error) {
    console.log(error);
  }
}

async function lowFilter() {
  try {
    const listingData = await apiData(listingsDataUrl, method);
    const result = listingData.sort((a, b) => b._count.bids - a._count.bids);

    document.getElementById("new-listing").style.backgroundColor = "#bfedce";
    document.getElementById("ending-soon-filter").style.backgroundColor = "#bfedce";
    document.getElementById("popular-listing").style.backgroundColor = "#bfedce";
    document.getElementById("low-price").style.backgroundColor = "#72f88d";
    document.getElementById("high-price").style.backgroundColor = "#bfedce";
    printFilterResult(result);
  } catch (error) {
    console.log(error);
  }
}

async function highFilter() {
  try {
    const listingData = await apiData(listingsDataUrl, method);

    console.log(listingData);
    // console.log(test);
    // const result = listingData.sort((a, b) => a.bids[listingData._count.bids - 1].amount - b.bids.amount[listingData._count.bids - 1]);
    // console.log(result);
    // const test2 = listingData.bids.length > 0 ? listingData.bids.reduce((max, bid) => Math.max(max, bid.amount), 0) : 0;
    // console.log("test", test2);

    // let bidListCollection = [];
    // let highestListingBid = [];
    // Object.values(listingData).forEach(function (bidsData) {
    //   // console.log(bidsData._count.bids);
    //   // const lastBidNr = bidsData._count.bids;

    //   console.log(bidsData);

    //   const test2 = Math.max(bidsData.bids.amount);
    //   console.log("test", test2);

    // // console.log(lastBidNr);
    // // console.log("222", lastBidNr - 1);
    // // if (lastBidNr.length) {
    // // console.log("tst", bidsData.bids[lastBidNr - 1]);
    // for (let i = 0; i < bidsData.bids.length; i++) {
    //   // console.log("tst", bidsData.bids[i]);
    //   const listingBids = bidsData.bids[i];
    //   // console.log("...............", listingBids);
    //   // console.log("asdfsadf", Math.max(highestBid[0].amount));
    //   bidListCollection.push(listingBids);
    //   console.log("...............", bidListCollection);
    // const highestBid = bidListCollection.sort((a, b) => b.amount - a.amount);
    // console.log("tst----", highestBid[0].amount);
    // highestListingBid.push(...highestBid);
    // console.log("...............", highestListingBid);
    // return highestBid[0];
    // }
    // }

    // console.log("--------------", highestBid[0]);

    //   if (bidsData._count.bids > 1) {
    //     console.log("1", bidsData);
    //     let bidListCollection = [];
    //     bidListCollection.push(listingData.bids);
    //     // const highestBid = bidListCollection[0].sort((a, b) => b.amount - a.amount);
    //     console.log("2", bidListCollection);
    //     // Object.values(bidsData).forEach(function (data) {
    //     //   console.log(data);
    //     // const result = bidsData.sort((a, b) => a.bids.amount - b.bids.amount);
    //     // console.log(result);
    // });
    //   }

    //   const result = bidsData.sort((a, b) => a.bids.amount - b.bids.amount);
    //   console.log(result);
    //   console.log(bidsData);
    // });

    // const result = listingData.sort((a, b) =>
    //   Object.values(listingData.bids).forEach(function (bidsData) {
    //     a.bidsData.amount - b.bidsData.amount;
    //   })
    // );

    // console.log(listingData);
    // console.log(result);

    document.getElementById("new-listing").style.backgroundColor = "#bfedce";
    document.getElementById("ending-soon-filter").style.backgroundColor = "#bfedce";
    document.getElementById("popular-listing").style.backgroundColor = "#bfedce";
    document.getElementById("low-price").style.backgroundColor = "#bfedce";
    document.getElementById("high-price").style.backgroundColor = "#72f88d";
    // printFilterResult(result);
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
