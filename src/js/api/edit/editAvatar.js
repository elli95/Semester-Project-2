import { API_PROFILE_URL } from "../constant-api.mjs";
import { apiData } from "../apiCall.mjs";
import { getLocalStorage } from "../../localStorage.mjs";

const method = "PUT";
const user = getLocalStorage("profile").name;
const userDataUrl = `${API_PROFILE_URL}/${user}` + "/media";

const editAvatar = document.querySelector("#edit-avatar");
const inputImgUrl = document.querySelector("#input-img-url");
editAvatar.addEventListener("submit", editProfileAvatar);

inputImgUrl.addEventListener("input", ShowTestAvatar);
inputImgUrl.addEventListener("click", ShowTestAvatar);

/**
 * Shows the image from the input field when editing the avatar image
 */
function ShowTestAvatar() {
  const value = inputImgUrl.value.toLowerCase();
  document.getElementById("output-img").src = value;
  document.getElementById("output-img").style.display = "flex";
}

/**
 * Post a new user avatar image to the api
 */
async function editProfileAvatar() {
  event.preventDefault();
  try {
    const avatarUpdate = {
      avatar: inputImgUrl.value,
    };

    const profileImgEdit = await apiData(userDataUrl, method, avatarUpdate);

    window.location.replace("../../../profile/index.html");
  } catch (error) {
    console.log(error);
  }
}
