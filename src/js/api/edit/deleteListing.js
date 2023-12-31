import { API_LISTINGS_URL, listingId } from "../constant-api.mjs";
import { apiData } from "../apiCall.mjs";

const listingDataUrl = `${API_LISTINGS_URL}/${listingId}`;

const deleteListingBtn = document.querySelector("#delete-listing-btn");
deleteListingBtn.addEventListener("click", deleteListing);

/**
 * Deletes the listing data based on id
 */
async function deleteListing() {
  try {
    const confirmDeletion = confirm("Are you sure you want to delete this listing?");
    if (confirmDeletion) {
      window.location.replace("../../../profile/index.html");
      const method = "DELETE";
      const listingDeletion = await apiData(listingDataUrl, method);
    }
    // });
  } catch (error) {
    console.log(error);
  }
}
