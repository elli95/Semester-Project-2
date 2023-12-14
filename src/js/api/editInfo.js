import { API_PROFILE_URL } from "../api/constant-api.mjs";
import { apiData } from "../api/apiCall.mjs";
import { getLocalStorage } from "../localStorage.mjs";

const method = "PUT";
const user = getLocalStorage("profile").name;
const userDataUrl = `${API_PROFILE_URL}/${user}` + "/media";

const editAvatar = document.querySelector("#edit-avatar");
const inputImgUrl = document.querySelector("#input-img-url");
editAvatar.addEventListener("submit", editProfileAvatar);
inputImgUrl.addEventListener("input", imgOutput);

async function editProfileAvatar() {
  event.preventDefault();
  try {
    const avatarUpdate = {
      avatar: inputImgUrl.value,
    };

    const profileImgEdit = await apiData(userDataUrl, method, avatarUpdate);
    console.log(profileImgEdit);

    window.location.replace("../../../profile/index.html");
  } catch (error) {
    console.log(error);
  }
}

function imgOutput() {
  const value = inputImgUrl.value.toLowerCase();
  document.getElementById("output-img").src = value;
  document.getElementById("output-img").style.display = "flex";
}
