import { API_LISTINGS_URL } from "../api/constant-api.mjs";
import { apiData } from "../api/apiCall.mjs";
import { listingEdit } from "../htmlStyle.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingId = params.get("id");

const listingDataUrl = `${API_LISTINGS_URL}/${listingId}`;

const listingUpdateForm = document.querySelector("#listing-update-form");
const listingTitle = document.querySelector("#listing-title");
const listingDescription = document.querySelector("#listing-description");
const listingTags = document.querySelector("#listing-tags");
const listingMedia = document.querySelector("#listing-media");
listingUpdateForm.addEventListener("submit", editListing);
listingMedia.addEventListener("input", imgOutput);

async function getListingData(listingDataUrl, data) {
  try {
    const method = "GET";
    // console.log("hello", listingDataUrl);
    const listingData = await apiData(listingDataUrl, method, data);
    // console.log("hllo", listingData);

    listingEdit(listingData);
  } catch (error) {
    console.log(error);
  }
}
getListingData(listingDataUrl);

async function editListing() {
  event.preventDefault();
  try {
    const avatarUpdate = {
      title: listingTitle.value,
      description: listingDescription.value,
      tags: [listingTags.value],
      media: [listingMedia.value],
    };

    const method = "PUT";
    const profileImgEdit = await apiData(listingDataUrl, method, avatarUpdate);
    // console.log(profileImgEdit);

    window.location.replace("../../../profile/index.html");
  } catch (error) {
    console.log(error);
  }
}

function imgOutput() {
  const value = listingMedia.value.toLowerCase();
  document.getElementById("output-img").src = value;
}
