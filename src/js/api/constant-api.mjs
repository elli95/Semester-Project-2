/**
 * Collection of links and other functions to shorten the length of code reuse
 */

const API_HOST_BASE_URL = "https://api.noroff.dev/api/v1";
const API_AUCTION_BASE = "/auction";
const API_REGISTER_BASE = "/auth/register";
const API_LOGIN_BASE = "/auth/login";
const API_PROFILE_BASE = "/profiles";
const API_LISTINGS_BASE = "/listings";
const API_SORT_DIRECTION = "?sort=created";
const API_BIDS_TRUE = "&_bids=true";

const API_LOGIN_URL = `${API_HOST_BASE_URL}${API_AUCTION_BASE}${API_LOGIN_BASE}`;

const API_REGISTER_URL = `${API_HOST_BASE_URL}${API_AUCTION_BASE}${API_REGISTER_BASE}`;

const API_PROFILE_URL = `${API_HOST_BASE_URL}${API_AUCTION_BASE}${API_PROFILE_BASE}`;

const API_LISTINGS_URL = `${API_HOST_BASE_URL}${API_AUCTION_BASE}${API_LISTINGS_BASE}`;

const API_LISTINGS_SORT_BIDS_URL = `${API_HOST_BASE_URL}${API_AUCTION_BASE}${API_LISTINGS_BASE}${API_SORT_DIRECTION}${API_BIDS_TRUE}`;

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const listingId = params.get("id");

export { API_REGISTER_URL, API_LOGIN_URL, API_PROFILE_URL, API_LISTINGS_URL, API_LISTINGS_SORT_BIDS_URL, listingId };
