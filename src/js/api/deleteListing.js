import { API_LISTINGS_URL } from "./constant-api.mjs";
import { apiData } from "../api/apiCall.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingId = params.get("id");

const listingDataUrl = `${API_LISTINGS_URL}/${listingId}`;

// const errorMessage = document.querySelector("#error-message");
const deleteListingBtn = document.querySelector("#delete-listing-btn");
deleteListingBtn.addEventListener("click", deleteListing);

async function deleteListing() {
  //   event.preventDefault();
  try {
    const method = "DELETE";
    const listingDeletion = await apiData(listingDataUrl, method);
    console.log(listingDeletion);

    // if (listingDeletion === undefined) {
    window.location.replace("../../../profile/index.html");
    // }
  } catch (error) {
    console.log(error);
  }
}
