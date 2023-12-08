import { API_PROFILE_URL } from "./api/constant-api.mjs";
import { apiData } from "./api/apiCall.mjs";
import { getLocalStorage } from "./localStorage.mjs";

const method = "GET";
const user = getLocalStorage("profile").name;
const userDataUrl = `${API_PROFILE_URL}/${user}`;

const showAllFilter = document.querySelector("#show-all-filter");
const myBidsFilter = document.querySelector("#my-bids-filter");
const myListingsFilter = document.querySelector("#my-listings-filter");
const myWinsFilter = document.querySelector("#my-wins-filter");

showAllFilter.addEventListener("click", showAll);
myBidsFilter.addEventListener("click", myBids);
myListingsFilter.addEventListener("click", myListings);
myWinsFilter.addEventListener("click", myWins);

async function showAll() {
  try {
    const userData = await apiData(userDataUrl, method);

    document.getElementById("my-listing-container").style.display = "flex";
    document.getElementById("my-bid-container").style.display = "flex";
    document.getElementById("my-bid-section-title").style.textAlign = "start";

    if (userData.wins.length > 0) {
      document.getElementById("my-wins-container").style.display = "flex";
      document.getElementById("my-wins-section-title").style.textAlign = "start";
    } else {
      document.getElementById("my-wins-container").style.display = "none";
      document.getElementById("my-wins-filter").style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
}

function myBids() {
  try {
    document.getElementById("my-listing-container").style.display = "none";
    document.getElementById("my-bid-container").style.display = "flex";
    document.getElementById("my-wins-container").style.display = "none";
    document.getElementById("my-bid-section-title").style.textAlign = "end";
  } catch (error) {
    console.log(error);
  }
}

function myListings() {
  try {
    document.getElementById("my-listing-container").style.display = "flex";
    document.getElementById("my-bid-container").style.display = "none";
    document.getElementById("my-wins-container").style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

async function myWins() {
  try {
    document.getElementById("my-listing-container").style.display = "none";
    document.getElementById("my-bid-container").style.display = "none";
    document.getElementById("my-wins-container").style.display = "flex";
    document.getElementById("my-wins-section-title").style.textAlign = "end";
  } catch (error) {
    console.log(error);
  }
}
