import { API_PROFILE_URL } from "./api/constant-api.mjs";
import { apiData } from "./api/apiCall.mjs";
import { getLocalStorage } from "./localStorage.mjs";
import { userHeader } from "./htmlStyle.js";

export async function getProfileData() {
  try {
    if (getLocalStorage("profile")) {
      const method = "GET";
      const user = getLocalStorage("profile").name;
      const userDataUrl = `${API_PROFILE_URL}/${user}`;
      const userData = await apiData(userDataUrl, method);
      userHeader(userData);
    }
  } catch (error) {
    console.log(error);
  }
}

getProfileData();
