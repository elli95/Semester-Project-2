import { API_LISTINGS_URL } from "../constant-api.mjs";
import { apiData } from "../apiCall.mjs";
import { ShowTestImage } from "../../showTestImg.mjs";

const listingUrl = `${API_LISTINGS_URL}`;

const createNewAuctionBtn = document.querySelector("#create-new-auction-btn");
const addNewImgInput = document.querySelector("#add-new-img-input");

const listingFormSection = document.querySelector("#listing-form");
const listingForm = document.querySelector("#listing-submission");
const listingTitle = document.querySelector("#listing-title");
const listingDescription = document.querySelector("#listing-text");
const listingTags = document.querySelector("#listing-tags");
const listingMedia = document.getElementsByClassName("listing-media-input");
const listingend = document.querySelector("#listing-end");

listingForm.addEventListener("submit", listingSubmission);
addNewImgInput.addEventListener("click", newImgInput);

/**
 * Listens after button clicks to then either show or hide new listing field.
 */
createNewAuctionBtn.addEventListener("click", function () {
  if (listingFormSection.style.display === "" || listingFormSection.style.display === "none") {
    document.getElementById("listing-form").style.display = "flex";
  } else {
    document.getElementById("listing-form").style.display = "none";
  }
});

/**
 * Adds a new input field to add a new image to the listing.
 */
function newImgInput() {
  const newListingMediaInput = document.getElementById("new-listing-media-input");
  const newListingMediaSection = document.createElement("div");
  const newListingMedia = document.createElement("input");

  newListingMediaInput.append(newListingMediaSection);
  newListingMediaSection.append(newListingMedia);

  newListingMediaSection.className = "mb-2";
  newListingMedia.className = "form-control listing-media-input";
  newListingMedia.setAttribute("type", "text");
  newListingMedia.setAttribute("name", "listing-media");

  newListingMediaSection.querySelector("input").placeholder = `Write an image link`;

  const collectionImg = document.querySelectorAll(".listing-media-input");
  for (let i = 0; i < collectionImg.length; i++) {
    collectionImg[i].addEventListener("click", ShowTestImage);
    collectionImg[i].addEventListener("input", ShowTestImage);
  }
}

/**
 * It post listing data from the new listing form to the api.
 */
async function listingSubmission() {
  event.preventDefault();
  try {
    const method = "POST";
    const allMediaInput = [...listingMedia].map((input) => input.value);

    const listingData = {
      title: listingTitle.value,
      description: listingDescription.value,
      tags: [listingTags.value],
      media: allMediaInput,
      endsAt: listingend.value,
    };

    const listingInfo = await apiData(listingUrl, method, listingData);

    if (location.pathname === `/` || location.pathname === `/index.html`) {
      window.location.replace("../../../index.html");
    } else {
      window.location.replace("../../../profile/index.html");
    }
  } catch (error) {
    console.log(error);
  }
}
