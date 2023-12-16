import { API_LISTINGS_URL, listingId } from "../constant-api.mjs";
import { apiData } from "../apiCall.mjs";
import { listingEdit } from "../../htmlStyle.js";
import { ShowTestImage } from "../../showTestImg.mjs";

const listingDataUrl = `${API_LISTINGS_URL}/${listingId}`;

const listingUpdateForm = document.querySelector("#listing-update-form");
const listingTitle = document.querySelector("#listing-title");
const listingDescription = document.querySelector("#listing-description");
const listingTags = document.querySelector("#listing-tags");
const listingMedia = document.getElementsByClassName("listing-media-input");
const addNewImgInput = document.querySelector("#add-new-img-input");

listingUpdateForm.addEventListener("submit", editListing);
addNewImgInput.addEventListener("click", newImgInput);

/**
 * Adds a new input field to add and show a new image to the listing.
 */
function newImgInput() {
  const newListingMediaInput = document.getElementById("listing-media");
  const newListingMedia = document.createElement("input");

  newListingMediaInput.append(newListingMedia);

  newListingMediaInput.className = "d-flex flex-column mb-2 p-0 gap-3";
  newListingMedia.className = "form-control listing-media-input";
  newListingMedia.setAttribute("type", "text");
  newListingMedia.setAttribute("name", "listing-media");

  newListingMediaInput.querySelector("input").placeholder = `Write an image link`;

  const collectionImg = document.querySelectorAll(".listing-media-input");
  for (let i = 0; i < collectionImg.length; i++) {
    collectionImg[i].addEventListener("click", ShowTestImage);
    collectionImg[i].addEventListener("input", ShowTestImage);
  }
}

/**
 * Retrieves listing data and displays it in input fields ready for editing.
 * @param {string} listingDataUrl Api url
 * @param {string} data The data that is retrieved
 */
async function getListingData(listingDataUrl, data) {
  try {
    const method = "GET";
    const listingData = await apiData(listingDataUrl, method, data);

    listingEdit(listingData);
  } catch (error) {
    console.log(error);
  }
}
getListingData(listingDataUrl);

/**
 * Post an edited listing to the api
 */
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

    window.location.replace("../../../profile/index.html");
  } catch (error) {
    console.log(error);
  }
}
