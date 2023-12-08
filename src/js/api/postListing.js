import { API_LISTINGS_URL } from "./constant-api.mjs";
import { apiData } from "./apiCall.mjs";

const listingUrl = `${API_LISTINGS_URL}`;

const createNewAuctionBtn = document.querySelector("#create-new-auction-btn");
const listingFormSection = document.querySelector("#listing-form");
const listingForm = document.querySelector("#listing-submission");
const listingTitle = document.querySelector("#listing-title");
const listingDescription = document.querySelector("#listing-text");
const listingTags = document.querySelector("#listing-tags");
const listingMedia = document.querySelector("#listing-media");
const listingend = document.querySelector("#listing-end");
// createNewAuctionBtn.addEventListener("click", showNewAuctionForm);
listingForm.addEventListener("submit", listingSubmission);
listingMedia.addEventListener("input", imgOutput);

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
    console.log(listingMedia.value);

    const listingData = {
      title: listingTitle.value,
      description: listingDescription.value,
      tags: [listingTags.value],
      media: [listingMedia.value],
      endsAt: listingend.value,
    };

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
