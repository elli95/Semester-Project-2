import { API_LISTINGS_URL } from "./constant-api.mjs";
import { apiData } from "./apiCall.mjs";

const listingUrl = `${API_LISTINGS_URL}`;

const createNewAuctionBtn = document.querySelector("#create-new-auction-btn");
const listingFormSection = document.querySelector("#listing-form");
const listingForm = document.querySelector("#listing-submission");
const listingTitle = document.querySelector("#listing-title");
const listingDescription = document.querySelector("#listing-text");
const listingTags = document.querySelector("#listing-tags");
const listingMedia = document.getElementsByClassName("listing-media-input");
// const listingMedia = document.querySelector("#listing-media");
const listingend = document.querySelector("#listing-end");
const addNewImgInput = document.querySelector("#add-new-img-input");

// createNewAuctionBtn.addEventListener("click", showNewAuctionForm);
listingForm.addEventListener("submit", listingSubmission);
// listingMedia.addEventListener("input", imgOutput);
addNewImgInput.addEventListener("click", newImgInput);

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
}

createNewAuctionBtn.addEventListener("click", function () {
  // function showNewAuctionForm() {
  console.log("099999999", listingFormSection);
  if (listingFormSection.style.display === "" || listingFormSection.style.display === "none") {
    document.getElementById("listing-form").style.display = "flex";
    // listingFormSection.style.display === "flex";
    console.log("hello", listingFormSection);
  } else {
    document.getElementById("listing-form").style.display = "none";
    console.log("hellooooooo099999999", listingFormSection);
  }
});

async function listingSubmission(event) {
  event.preventDefault();
  try {
    const method = "POST";
    const allMediaInput = [...listingMedia].map((input) => input.value);
    console.log("1", allMediaInput);

    const listingData = {
      title: listingTitle.value,
      description: listingDescription.value,
      tags: [listingTags.value],
      // media: [listingMedia.value],
      media: allMediaInput,
      endsAt: listingend.value,
    };

    console.log("2", listingData);

    const listingInfo = await apiData(listingUrl, method, listingData);
    console.log(listingInfo);

    window.location.replace("../../../index.html");
  } catch (error) {
    console.log(error);
  }
}

function imgOutput() {
  const value = listingMedia.value.toLowerCase();
  document.getElementById("output-img").src = value;
}
