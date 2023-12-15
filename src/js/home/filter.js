import { API_LISTINGS_URL } from "../api/constant-api.mjs";
import { apiData } from "../api/apiCall.mjs";
import { listingsCard } from "../htmlStyle.js";

const method = "GET";
const listingsDataUrl = `${API_LISTINGS_URL}` + "?_bids=true&sort=created";

const newListing = document.querySelector("#new-listing");
const endingSoon = document.querySelector("#ending-soon-filter");
const popularListing = document.querySelector("#popular-listing");
// const lowPrice = document.querySelector("#low-price");
// const highPrice = document.querySelector("#high-price");

newListing.addEventListener("click", newFilter);
endingSoon.addEventListener("click", getLimitedEndingFilter);
// endingSoon.addEventListener("click", endingFilter);
popularListing.addEventListener("click", popularFilter);
// lowPrice.addEventListener("click", lowFilter);
// highPrice.addEventListener("click", highFilter);

const showMoreListingBtn = document.querySelector("#show-more-listing-btn");
// const showLessListingBtn = document.querySelector("#show-less-listing-btn");
showMoreListingBtn.addEventListener("click", getAllEndingFilter);
// showLessListingBtn.addEventListener("click", getLimitedListingData);

async function newFilter() {
  try {
    const listingData = await apiData(listingsDataUrl, method);
    const result = listingData.sort((a, b) => new Date(b.created) - new Date(a.created));

    document.getElementById("new-listing").style.color = "var(--white-color)";
    document.getElementById("new-listing").style.backgroundColor = "var(--btn-color)";
    document.getElementById("ending-soon-filter").style.color = "var(--black-color)";
    document.getElementById("ending-soon-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("popular-listing").style.color = "var(--black-color)";
    document.getElementById("popular-listing").style.backgroundColor = "var(--listing-color)";
    // document.getElementById("low-price").style.color = "var(--black-color)";
    // document.getElementById("low-price").style.backgroundColor = "var(--listing-color)";
    // document.getElementById("high-price").style.color = "var(--black-color)";
    // document.getElementById("high-price").style.backgroundColor = "var(--listing-color)";

    printFilterResult(result);
  } catch (error) {
    console.log(error);
  }
}

// const endDateSetup = {
//   second: "numeric",
//   minute: "numeric",
//   hour: "numeric",
//   day: "numeric",
//   month: "numeric",
//   year: "numeric",
// };

async function getLimitedEndingFilter() {
  try {
    document.querySelector("#show-more-listing-btn").style.display = "block";
    document.querySelector("#show-more-listing-btn").className = "btn-style endingFilter";
    document.querySelector("#show-less-listing-btn").style.display = "none";

    const listingData = await apiData(listingsDataUrl + "&limit=18", method);
    console.log("hi", listingData);
    endingFilter(listingData);
  } catch (error) {
    console.log(error);
  }
}

async function getAllEndingFilter() {
  const test = document.querySelector("#ending-soon-filter");
  console.log(test);
  try {
    if (test.style.backgroundColor === "var(--btn-color)") {
      const endingFilter = document.querySelector(".endingFilter");
      document.querySelector("#show-less-listing-btn").style.display = "block";
      document.querySelector("#show-more-listing-btn").style.display = "none";
      // document.querySelector("#show-less-listing-btn").className = "btn-style endingFilter";

      const listingData = await apiData(listingsDataUrl, method);
      console.log("hihihi", listingData);
      endingFilter(listingData);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function endingFilter(listingData) {
  try {
    // const listingData = await apiData(listingsDataUrl, method);
    const result = listingData.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));

    document.getElementById("new-listing").style.color = "var(--black-color)";
    document.getElementById("new-listing").style.backgroundColor = "var(--listing-color)";
    document.getElementById("ending-soon-filter").style.color = "var(--white-color)";
    document.getElementById("ending-soon-filter").style.backgroundColor = "var(--btn-color)";
    document.getElementById("popular-listing").style.color = "var(--black-color)";
    document.getElementById("popular-listing").style.backgroundColor = "var(--listing-color)";
    // document.getElementById("low-price").style.color = "var(--black-color)";
    // document.getElementById("low-price").style.backgroundColor = "var(--listing-color)";
    // document.getElementById("high-price").style.color = "var(--black-color)";
    // document.getElementById("high-price").style.backgroundColor = "var(--listing-color)";

    document.getElementById("listingsSection").innerText = "";

    Object.values(result).forEach(function (listing) {
      const currentDate = new Date();
      const listingEndDate = new Date(listing.endsAt);
      // const currentDate = currentDateData.toLocaleString("en-GB", endDateSetup);
      // const listingEndDate = ListingEndsAt.toLocaleString("en-GB", endDateSetup);
      if (currentDate < listingEndDate) {
        const listingsSection = document.getElementById("listingsSection");
        listingsCard(listing, listingsSection);
        // listingsCard(listing);
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

    document.getElementById("new-listing").style.color = "var(--black-color)";
    document.getElementById("new-listing").style.backgroundColor = "var(--listing-color)";
    document.getElementById("ending-soon-filter").style.color = "var(--black-color)";
    document.getElementById("ending-soon-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("popular-listing").style.color = "var(--white-color)";
    document.getElementById("popular-listing").style.backgroundColor = "var(--btn-color)";
    // document.getElementById("low-price").style.color = "var(--black-color)";
    // document.getElementById("low-price").style.backgroundColor = "var(--listing-color)";
    // document.getElementById("high-price").style.color = "var(--black-color)";
    // document.getElementById("high-price").style.backgroundColor = "var(--listing-color)";

    printFilterResult(result);
  } catch (error) {
    console.log(error);
  }
}

// async function lowFilter() {
//   try {
//     const listingData = await apiData(listingsDataUrl, method);
//     const result = listingData.sort((a, b) => b._count.bids - a._count.bids);

//     document.getElementById("new-listing").style.color = "var(--black-color)";
//     document.getElementById("new-listing").style.backgroundColor = "var(--listing-color)";
//     document.getElementById("ending-soon-filter").style.color = "var(--black-color)";
//     document.getElementById("ending-soon-filter").style.backgroundColor = "var(--listing-color)";
//     document.getElementById("popular-listing").style.color = "var(--black-color)";
//     document.getElementById("popular-listing").style.backgroundColor = "var(--listing-color)";
//     document.getElementById("low-price").style.color = "var(--white-color)";
//     document.getElementById("low-price").style.backgroundColor = "var(--btn-color)";
//     document.getElementById("high-price").style.color = "var(--black-color)";
//     document.getElementById("high-price").style.backgroundColor = "var(--listing-color)";

//     printFilterResult(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function highFilter() {
//   try {
//     const listingData = await apiData(listingsDataUrl, method);

//     // let bidListCollection = [];
//     console.log(listingData);
//     // const tttest = new Map([...listingData.bids()].sort());
//     // console.log("2,", tttest);

//     Object.values(listingData).forEach(function (bidsData) {
//       // console.log(bidsData);
//       const bidLength = bidsData._count.bids - 1;
//       // console.log("bidLength", bidLength);
//       if (bidLength > 0) {
//         console.log("amount", bidsData.bids[bidLength]);
//       }
//       // const sortedBidData = bidsData.bids.sort((a, b) => b.amount - a.amount);
//       // // console.log(bidsData.bids.sort((a, b) => b.amount - a.amount));
//       // bidListCollection.push(sortedBidData);
//       // // console.log("bidListCollection", bidListCollection.amount);
//       // // console.log("bidListCollection", bidListCollection.length);
//       // // const testMap = new Map(bidListCollection);
//       // // console.log("testMap", bidListCollection.map());
//       // Object.values(bidListCollection).forEach(function (bidsData) {
//       //   if (bidsData.length > 0) {
//       //     console.log("testMap", bidsData[0]);
//       //     // console.log(bidListCollection.sort((a, b) => b.amount - a.amount));
//       //   }
//       // });
//       // console.log(test);
//     });
//     // const result = listingData.sort((a, b) =>
//     //   a.forEach((bid) => {
//     //     bid.amount;
//     //   })
//     // );

//     // console.log(result);
//     // const result = listingData.sort((a, b) => a.bids[listingData._count.bids - 1].amount - b.bids.amount[listingData._count.bids - 1]);
//     // console.log(result);
//     // const test2 = listingData.bids.length > 0 ? listingData.bids.reduce((max, bid) => Math.max(max, bid.amount), 0) : 0;
//     // console.log("test", test2);

//     // let bidListCollection = [];
//     // let highestListingBid = [];
//     // Object.values(listingData).forEach(function (bidsData) {
//     //   // console.log(bidsData._count.bids);
//     // const lastBidNr = bidsData._count.bids;

//     //   console.log(bidsData);

//     //   const test2 = Math.max(bidsData.bids.amount);
//     //   console.log("test", test2);

//     // // console.log(lastBidNr);
//     // // console.log("222", lastBidNr - 1);
//     // if (lastBidNr.length) {
//     // // console.log("tst", bidsData.bids[lastBidNr - 1]);
//     // for (let i = 0; i < bidsData.bids.length; i++) {
//     //   console.log("tst", bidsData.bids[i]);
//     //   const listingBids = bidsData.bids[i];
//     //   // console.log("...............", listingBids);
//     //   // console.log("asdfsadf", Math.max(highestBid[0].amount));
//     //   bidListCollection.push(listingBids);
//     //   console.log("...............", bidListCollection);
//     // const highestBid = bidListCollection.sort((a, b) => b.amount - a.amount);
//     // console.log("tst----", highestBid[0].amount);
//     // highestListingBid.push(...highestBid);
//     // console.log("...............", highestListingBid);
//     // return highestBid[0];
//     // }
//     // }

//     // console.log("--------------", highestBid[0]);

//     //   if (bidsData._count.bids > 1) {
//     //     console.log("1", bidsData);
//     //     let bidListCollection = [];
//     //     bidListCollection.push(listingData.bids);
//     //     // const highestBid = bidListCollection[0].sort((a, b) => b.amount - a.amount);
//     //     console.log("2", bidListCollection);
//     //     // Object.values(bidsData).forEach(function (data) {
//     //     //   console.log(data);
//     //     // const result = bidsData.sort((a, b) => a.bids.amount - b.bids.amount);
//     //     // console.log(result);
//     // });
//     //   }

//     //   const result = bidsData.sort((a, b) => a.bids.amount - b.bids.amount);
//     //   console.log(result);
//     //   console.log(bidsData);
//     // });

//     // const result = listingData.sort((a, b) =>
//     //   Object.values(listingData.bids).forEach(function (bidsData) {
//     //     a.bidsData.amount - b.bidsData.amount;
//     //   })
//     // );

//     // console.log(listingData);
//     // console.log(result);

//     document.getElementById("new-listing").style.color = "var(--black-color)";
//     document.getElementById("new-listing").style.backgroundColor = "var(--listing-color)";
//     document.getElementById("ending-soon-filter").style.color = "var(--black-color)";
//     document.getElementById("ending-soon-filter").style.backgroundColor = "var(--listing-color)";
//     document.getElementById("popular-listing").style.color = "var(--black-color)";
//     document.getElementById("popular-listing").style.backgroundColor = "var(--listing-color)";
//     document.getElementById("low-price").style.color = "var(--black-color)";
//     document.getElementById("low-price").style.backgroundColor = "var(--listing-color)";
//     document.getElementById("high-price").style.color = "var(--white-color)";
//     document.getElementById("high-price").style.backgroundColor = "var(--btn-color)";
//     // printFilterResult(result);
//   } catch (error) {
//     console.log(error);
//   }
// }

function printFilterResult(result) {
  document.getElementById("listingsSection").innerText = "";
  Object.values(result).forEach(function (listing) {
    const listingsSection = document.getElementById("listingsSection");
    listingsCard(listing, listingsSection);
    // listingsCard(listing);
  });
}
