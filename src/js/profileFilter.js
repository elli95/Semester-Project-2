import { API_PROFILE_URL } from "./api/constant-api.mjs";
import { apiData } from "./api/apiCall.mjs";
import { getLocalStorage } from "./localStorage.mjs";
import { profileListingsCard, profileBidCard, profileWinCard } from "./htmlStyle.js";

const method = "GET";
const user = getLocalStorage("profile").name;
const userDataUrl = `${API_PROFILE_URL}/${user}`;

// const showAllFilter = document.querySelector("#show-all-filter");
const myBidsFilter = document.querySelector("#my-bids-filter");
const myListingsFilter = document.querySelector("#my-listings-filter");
const myWinsFilter = document.querySelector("#my-wins-filter");

// showAllFilter.addEventListener("click", showAll);
myBidsFilter.addEventListener("click", myBids);
myListingsFilter.addEventListener("click", myListings);
myWinsFilter.addEventListener("click", myWins);

// async function showAll() {
//   try {
//     const userData = await apiData(userDataUrl, method);

//     document.getElementById("my-listing-container").style.display = "flex";
//     document.getElementById("my-bid-container").style.display = "flex";
//     document.getElementById("my-bid-section-title").style.textAlign = "start";

//     if (userData.wins.length > 0) {
//       document.getElementById("my-wins-container").style.display = "flex";
//       document.getElementById("my-wins-section-title").style.textAlign = "start";
//     } else {
//       document.getElementById("my-wins-container").style.display = "none";
//       document.getElementById("my-wins-filter").style.display = "none";
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

const endDateSetup = {
  second: "numeric",
  minute: "numeric",
  hour: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

async function myListings() {
  try {
    const listingData = await apiData(userDataUrl + "/listings?_bids=true", method);

    document.getElementById("my-listings-filter").style.color = "var(--white-color)";
    document.getElementById("my-listings-filter").style.backgroundColor = "var(--btn-color)";
    document.getElementById("my-bids-filter").style.color = "var(--black-color)";
    document.getElementById("my-bids-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("my-wins-filter").style.color = "var(--black-color)";
    document.getElementById("my-wins-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("listingsSection").innerText = "";

    Object.values(listingData).forEach(function (listing) {
      profileListingsCard(listing);
    });
    //   document.getElementById("my-listing-container").style.display = "flex";
    //   document.getElementById("my-bid-container").style.display = "none";
    //   document.getElementById("my-wins-container").style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

async function myBids() {
  try {
    const userBids = await apiData(userDataUrl + "/bids?_listings=true", method);
    const lastBid = userBids.filter((obj, index) => userBids.findIndex((bid) => bid.listing.id === obj.listing.id) === index);

    // background-color: #006815;
    // color: white;

    document.getElementById("my-listings-filter").style.color = "var(--black-color)";
    document.getElementById("my-listings-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("my-bids-filter").style.color = "var(--white-color)";
    document.getElementById("my-bids-filter").style.backgroundColor = "var(--btn-color)";
    document.getElementById("my-wins-filter").style.color = "var(--black-color)";
    document.getElementById("my-wins-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("listingsSection").innerText = "";

    Object.values(lastBid).forEach(function (bidData) {
      const currentDateData = new Date();
      let listingdate = new Date(bidData.listing.endsAt);
      const currentDate = currentDateData.toLocaleString("en-GB", endDateSetup);
      const listingEndDate = listingdate.toLocaleString("en-GB", endDateSetup);

      if (currentDate < listingEndDate) {
        profileBidCard(bidData);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function myWins() {
  try {
    const userData = await apiData(userDataUrl, method);
    const userBids = await apiData(userDataUrl + "/bids?_listings=true", method);

    document.getElementById("my-listings-filter").style.color = "var(--black-color)";
    document.getElementById("my-listings-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("my-bids-filter").style.color = "var(--black-color)";
    document.getElementById("my-bids-filter").style.backgroundColor = "var(--listing-color)";
    document.getElementById("my-wins-filter").style.color = "var(--white-color)";
    document.getElementById("my-wins-filter").style.backgroundColor = "var(--btn-color)";
    document.getElementById("listingsSection").innerText = "";

    const myWins = userData.wins;
    const auctionWins = userBids.filter((bids) => myWins.includes(bids.listing.id));
    Object.values(auctionWins).forEach(function (winData) {
      profileWinCard(winData);
    });
    // document.getElementById("my-listing-container").style.display = "none";
    // document.getElementById("my-bid-container").style.display = "none";
    // document.getElementById("my-wins-container").style.display = "flex";
    // document.getElementById("my-wins-section-title").style.textAlign = "end";
  } catch (error) {
    console.log(error);
  }
}
