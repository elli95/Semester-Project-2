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
// const listingMedia = document.querySelector("#listing-media");
const listingMedia = document.getElementsByClassName("listing-media-input");
const addNewImgInput = document.querySelector("#add-new-img-input");

listingUpdateForm.addEventListener("submit", editListing);
// listingMedia.addEventListener("input", imgOutput);
addNewImgInput.addEventListener("click", newImgInput);

function newImgInput() {
  // const newListingMediaInput = document.getElementById("new-listing-media-input");
  const newListingMediaInput = document.getElementById("listing-media");
  // const newListingMediaSection = document.createElement("div");
  const newListingMedia = document.createElement("input");

  // newListingMediaInput.append(newListingMediaSection);
  newListingMediaInput.append(newListingMedia);

  newListingMediaInput.className = "mb-2";
  newListingMedia.className = "form-control listing-media-input";
  newListingMedia.setAttribute("type", "text");
  newListingMedia.setAttribute("name", "listing-media");

  newListingMediaInput.querySelector("input").placeholder = `Write an image link`;
  imgOutput();
}

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
    const allMediaInput = [...listingMedia].map((input) => input.value);

    const avatarUpdate = {
      title: listingTitle.value,
      description: listingDescription.value,
      tags: [listingTags.value],
      media: allMediaInput,
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
  const collectionImg = document.querySelectorAll(".listing-media-input");
  for (let i = 0; i < collectionImg.length; i++) {
    collectionImg[i].addEventListener("click", function () {
      console.log(this.value);
      document.getElementById("edit-img-display").src = this.value;
      console.log("hei");
    });
  }
  //   const value = listingMedia.value.toLowerCase();
  //   document.getElementById("output-img").src = value;
}
