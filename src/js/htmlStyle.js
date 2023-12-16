import { getCountdownDate, getPreciseCountdownDate } from "./dateCountdown.js";
import { ShowTestImage } from "./showTestImg.mjs";

/**
 * Checks if an image gets an error, and replaces it with a placeholder image where it is true.
 */
function imgCheckError() {
  const imgCheck = document.querySelectorAll(".img-check");
  for (let i = 0; i < imgCheck.length; i++) {
    imgCheck[i].onerror = function () {
      this.src = `/images/no-img-avaliable.webp`;
    };
  }
}

/**
 * Shows a limited number (4) listings in the popular part of the html page.
 * @param {string} listing Data from api call
 * @param {string} activListing The ID of the first result in the api call
 */
function popularListingsCard(listing, activListing) {
  const currentDate = new Date();
  const listingDate = new Date(listing.endsAt);

  const listingsSection = document.getElementById("ending-soon");
  const cardContainer = document.createElement("div");
  const listingLink = document.createElement("a");
  const auctionContainer = document.createElement("div");
  const listingTitle = document.createElement("h2");
  const imgContainer = document.createElement("div");
  const listingImg = document.createElement("img");
  const infoContainer = document.createElement("div");
  const listingDescription = document.createElement("h3");
  const listingEndTime = document.createElement("h4");
  const listingHighestBid = document.createElement("h5");

  listingsSection.append(cardContainer);
  cardContainer.append(listingLink);
  listingLink.append(auctionContainer);
  auctionContainer.append(listingTitle);
  auctionContainer.append(imgContainer);
  imgContainer.append(listingImg);
  auctionContainer.append(infoContainer);
  infoContainer.append(listingDescription);
  infoContainer.append(listingEndTime);
  infoContainer.append(listingHighestBid);

  cardContainer.className = "carousel-item listing-card popular-listing-box-style";
  cardContainer.setAttribute("data-bs-interval", "10000");
  if (activListing === listing.id) {
    cardContainer.className = "carousel-item active listing-card popular-listing-box-style";
  }
  listingLink.className = "text-decoration-none text-reset ";
  auctionContainer.className = "d-grid popular-listing-style";
  listingTitle.className = "fw-bold text-center ps-3 pt-2 grid-a";
  imgContainer.className = "popular-auction-img grid-b";
  infoContainer.className = "d-flex flex-column align-items-center m-2 grid-c popular-info-container-style";
  listingImg.className = "img-check";

  cardContainer.querySelector("a").href = `/listing/index.html?id=${listing.id}`;
  auctionContainer.querySelector("h2").innerText = `${listing.title}`;

  if (listing.media.length > 0) {
    imgContainer.querySelector("img").src = `${listing.media[0]}`;
    imgContainer.querySelector("img").alt = `Product image`;
  } else {
    imgContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
    imgContainer.querySelector("img").alt = `No product image available`;
  }

  infoContainer.querySelector("h3").innerText = `${listing.description}`;

  if (currentDate < listingDate) {
    const endData = "h4";
    getCountdownDate(listing, infoContainer, endData);
  } else {
    infoContainer.querySelector("h4").innerText = `Ended`;
  }

  if (listing.bids.length === 0) {
    infoContainer.querySelector("h5").innerText = "Be the first to bid";
  } else {
    let bidValues = [];
    Object.values(listing.bids).forEach(function (data) {
      const bids = data.amount;
      bidValues.push(bids);
      const highestBid = Math.max(...bidValues);
      infoContainer.querySelector("h5").innerText = `Highest bid: ${highestBid}`;
    });
  }

  imgCheckError();
}

/**
 * Shows listings on the index html page.
 * @param {string} listing Data from api call
 */
function listingsCard(listing) {
  const currentDate = new Date();
  const listingDate = new Date(listing.endsAt);

  const listingsSection = document.getElementById("listingsSection");
  const cardContainer = document.createElement("div");
  const listingLink = document.createElement("a");
  const auctionContainer = document.createElement("div");
  const listingTitle = document.createElement("h2");
  const imgContainer = document.createElement("div");
  const listingImg = document.createElement("img");
  const infoContainer = document.createElement("div");
  const listingDescription = document.createElement("h3");
  const listingEndTime = document.createElement("h4");
  const listingHighestBid = document.createElement("h5");

  listingsSection.append(cardContainer);
  cardContainer.append(listingLink);
  listingLink.append(auctionContainer);
  auctionContainer.append(listingTitle);
  auctionContainer.append(imgContainer);
  imgContainer.append(listingImg);
  auctionContainer.append(infoContainer);
  infoContainer.append(listingDescription);
  infoContainer.append(listingEndTime);
  infoContainer.append(listingHighestBid);

  cardContainer.className = "card h-100 m-3 listing-card col-11 col-md-5 col-xl-3";
  listingLink.className = "text-decoration-none text-reset";
  listingTitle.className = "fw-bold ps-3 pt-2";
  imgContainer.className = "auction-img";
  infoContainer.className = "d-flex flex-column align-items-center m-2";
  listingImg.className = "img-check";

  cardContainer.querySelector("a").href = `/listing/index.html?id=${listing.id}`;
  auctionContainer.querySelector("h2").innerText = `${listing.title}`;

  if (listing.media.length > 0) {
    imgContainer.querySelector("img").src = `${listing.media[0]}`;
    imgContainer.querySelector("img").alt = `Product image`;
  } else {
    imgContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
    imgContainer.querySelector("img").alt = `No product image available`;
  }

  infoContainer.querySelector("h3").innerText = `${listing.description}`;

  if (currentDate < listingDate) {
    const endData = "h4";
    getCountdownDate(listing, infoContainer, endData);
  } else {
    infoContainer.querySelector("h4").innerText = `Ended`;
  }

  if (listing.bids.length === 0) {
    infoContainer.querySelector("h5").innerText = "Be the first to bid";
  } else {
    let bidValues = [];
    Object.values(listing.bids).forEach(function (data) {
      const bids = data.amount;
      bidValues.push(bids);
      const highestBid = Math.max(...bidValues);
      infoContainer.querySelector("h5").innerText = `Highest bid: ${highestBid}`;
    });
  }

  imgCheckError();
}

/**
 * Shows listings on the listing/index html page.
 * @param {string} listingData Data from api call
 */
function listingPage(listingData) {
  const currentDate = new Date();
  const listingDate = new Date(listingData.endsAt);

  const listingSection = document.getElementById("specific-listing");
  const postContainer = document.createElement("div");
  const listingContainer = document.createElement("div");
  const profileContainer = document.createElement("div");
  const sellerAvatar = document.createElement("img");
  const sellerText = document.createElement("div");
  const sellerName = document.createElement("h2");
  const sellerEmail = document.createElement("h3");
  const listingTitle = document.createElement("h1");
  const listingimgBox = document.createElement("div");
  const listingImg = document.createElement("img");
  const ImgCollectionSection = document.createElement("div");
  const infoContainer = document.createElement("div");
  const listingDescription = document.createElement("h2");
  const listingEndTime = document.createElement("h3");
  const timeSection = document.createElement("div");
  const daysSection = document.createElement("div");
  const daysText = document.createElement("h2");
  const daysDate = document.createElement("h3");
  const hoursSection = document.createElement("div");
  const hoursText = document.createElement("h2");
  const hoursDate = document.createElement("h3");
  const minSection = document.createElement("div");
  const minText = document.createElement("h2");
  const minDate = document.createElement("h3");
  const secSection = document.createElement("div");
  const secText = document.createElement("h2");
  const secDate = document.createElement("h3");

  listingSection.append(postContainer);
  postContainer.append(listingContainer);
  listingContainer.append(listingTitle);
  listingContainer.append(listingimgBox);
  listingimgBox.append(listingImg);
  listingimgBox.append(ImgCollectionSection);
  listingContainer.append(infoContainer);
  infoContainer.append(listingDescription);
  listingContainer.append(profileContainer);
  profileContainer.append(sellerAvatar);
  profileContainer.append(sellerText);
  sellerText.append(sellerName);
  sellerText.append(sellerEmail);

  profileContainer.className = "grid-a d-flex border border-dark text-break gap-3 my-3 p-3 profile-container";
  sellerAvatar.className = "header-profile-img mb-0 img-check";
  listingContainer.className = "d-flex flex-column align-items-center px-3 text-center specific-listing";
  listingTitle.className = "grid-b mt-4";
  listingimgBox.className = "grid-c specific-listing-style";
  listingImg.className = "specific-listing-main-img img-check";
  ImgCollectionSection.className = "d-flex specific-img-collection justify-content-center";
  infoContainer.className = "d-flex flex-column-reverse align-items-center gap-4 grid-d ";
  listingDescription.className = "mx-3 mb-3 text-break specific-info-container";

  listingContainer.querySelector("h1").innerText = `${listingData.title}`;
  if (listingData.media.length !== 0) {
    listingimgBox.querySelector("img").src = `${listingData.media[0]}`;
    listingimgBox.querySelector("img").alt = `Product image`;
  } else {
    listingimgBox.querySelector("img").src = `/images/no-img-avaliable.webp`;
    listingimgBox.querySelector("img").alt = `No product image available`;
  }

  if (listingData.media.length > 1) {
    Object.values(listingData.media).forEach(function (img) {
      const listingImgCollection = document.createElement("div");
      const imgCollection = document.createElement("img");

      ImgCollectionSection.append(listingImgCollection);
      listingImgCollection.append(imgCollection);

      imgCollection.className = "collection-img img-check";

      const collectionImg = document.querySelectorAll(".collection-img");
      for (let i = 0; i < collectionImg.length; i++) {
        collectionImg[i].addEventListener("click", function () {
          listingimgBox.querySelector("img").src = this.src;
        });
      }
      listingImgCollection.querySelector("img").src = `${img}`;
      listingImgCollection.querySelector("img").alt = `Product image`;
    });
  }

  if (currentDate < listingDate) {
    timeSection.className = "d-flex gap-2 mb-3";
    daysSection.className = "countdownBox";
    hoursSection.className = "countdownBox";
    minSection.className = "countdownBox";
    secSection.className = "countdownBox";

    infoContainer.append(timeSection);
    timeSection.append(daysSection);
    daysSection.append(daysText);
    daysSection.append(daysDate);
    timeSection.append(hoursSection);
    hoursSection.append(hoursText);
    hoursSection.append(hoursDate);
    timeSection.append(minSection);
    minSection.append(minText);
    minSection.append(minDate);
    timeSection.append(secSection);
    secSection.append(secText);
    secSection.append(secDate);

    daysSection.querySelector("h2").innerText = `Days`;
    hoursSection.querySelector("h2").innerText = `Hours`;
    minSection.querySelector("h2").innerText = `Minutes`;
    secSection.querySelector("h2").innerText = `Seconds`;

    const endData = "h3";
    getPreciseCountdownDate(listingData, daysSection, hoursSection, minSection, secSection, endData);
  } else {
    infoContainer.append(listingEndTime);

    listingEndTime.className = "endTime";

    infoContainer.querySelector("h3").innerText = `Ended`;
  }

  infoContainer.querySelector("h2").innerText = `${listingData.description}`;

  profileContainer.querySelector("img").src = `${listingData.seller.avatar}`;
  profileContainer.querySelector("img").alt = `User avatar`;
  sellerText.querySelector("h2").innerText = `${listingData.seller.name}`;
  sellerText.querySelector("h3").innerText = `${listingData.seller.email}`;

  imgCheckError();
}

/**
 * Shows user credits on the listing/index html page.
 * @param {string} userData Data from api call
 */
function userCredits(userData) {
  const creditSection = document.getElementById("user-credits");
  const bidSection = document.createElement("div");
  const bidCredit = document.createElement("h2");

  creditSection.append(bidSection);
  bidSection.append(bidCredit);

  bidSection.className = "d-inline-grid gap-2";

  bidSection.querySelector("h2").innerText = `Your credit: ${userData.credits}`;
}

/**
 * Shows user bids on the listing/index html page.
 * @param {string} highestBid Data from api call
 */
function bidsList(highestBid) {
  const bidSection = document.getElementById("listing-bids");
  const bidList = document.createElement("li");
  const bidInfo = document.createElement("div");
  const bid = document.createElement("div");
  const bidListBids = document.createElement("h2");
  const bidder = document.createElement("div");
  const bidderName = document.createElement("h2");

  bidSection.append(bidList);
  bidList.append(bidInfo);
  bidInfo.append(bid);
  bid.append(bidListBids);
  bidInfo.append(bidder);
  bidder.append(bidderName);

  bidList.className = "d-flex justify-content-evenly col-12 list-group-item gap-5 px-4 pt-2";
  bidInfo.className = "d-flex gap-5 col-10";
  bid.className = "col-2";
  bidder.className = "col-8 text-break";

  bid.querySelector("h2").innerText = `${highestBid.amount},-`;
  bidder.querySelector("h2").innerText = ` ${highestBid.bidderName}`;
}

/**
 * Shows user data in the header on the html page.
 * @param {string} userData Data from api call
 */
function userHeader(userData) {
  const headerProfileSection = document.getElementById("header-profile");
  const headerProfileLink = document.createElement("a");
  const textBox = document.createElement("div");
  const userName = document.createElement("h2");
  const userCredit = document.createElement("h3");
  const profileAvatar = document.createElement("img");

  headerProfileSection.append(headerProfileLink);
  headerProfileLink.append(textBox);
  textBox.append(userName);
  textBox.append(userCredit);
  headerProfileLink.append(profileAvatar);

  headerProfileLink.className = "d-flex text-dark menu-list-style";
  textBox.className = "text-center header-profile";
  profileAvatar.className = "header-profile-img img-check";

  headerProfileSection.querySelector("a").href = `/profile/index.html`;
  textBox.querySelector("h2").innerText = `${userData.name}`;
  textBox.querySelector("h3").innerText = `Your credit: ${userData.credits}`;
  headerProfileLink.querySelector("img").src = `${userData.avatar}`;
  headerProfileLink.querySelector("img").alt = `User avatar`;

  imgCheckError();
}

/**
 * Shows user data on profile page.
 * @param {string} userData Userdata from api call
 * @param {string} lastBid Filterd user bids data from api call
 */
function profileStyle(userData, lastBid) {
  const profileData = document.getElementById("profileData");
  const imgContainer = document.createElement("div");
  const profileAvatar = document.createElement("img");
  const profileinfoBox = document.createElement("div");
  const userName = document.createElement("h1");
  const userEmail = document.createElement("h2");
  const creditBidsListings = document.createElement("div");
  const creditsContainer = document.createElement("div");
  const creditsText = document.createElement("h2");
  const creditsValue = document.createElement("p");
  const bidsAndListings = document.createElement("div");
  const activeBids = document.createElement("div");
  const bidsText = document.createElement("h2");
  const bidsValue = document.createElement("p");
  const listings = document.createElement("div");
  const listingsText = document.createElement("h2");
  const listingsValue = document.createElement("p");

  profileData.append(imgContainer);
  imgContainer.append(profileAvatar);
  profileData.append(profileinfoBox);
  profileinfoBox.append(userName);
  profileinfoBox.append(userEmail);
  profileData.append(creditBidsListings);
  creditBidsListings.append(creditsContainer);
  creditsContainer.append(creditsText);
  creditsContainer.append(creditsValue);
  creditBidsListings.append(bidsAndListings);
  bidsAndListings.append(activeBids);
  activeBids.append(bidsText);
  activeBids.append(bidsValue);
  bidsAndListings.append(listings);
  listings.append(listingsText);
  listings.append(listingsValue);

  imgContainer.className = "align-self-center m-3 grid-a";
  profileAvatar.className = "profile-img img-check";
  profileinfoBox.className = "align-self-center grid-b text-center";
  creditBidsListings.className = "d-flex flex-column gap-3 grid-c align-self-center";
  creditsContainer.className = "col-12 d-flex flex-row justify-content-center gap-1";
  bidsAndListings.className = "d-flex justify-content-center align-self-center gap-3 bids-list";
  activeBids.className = "col-6 d-flex flex-row gap-2 bids";
  listings.className = "col-6 d-flex flex-row gap-2 list";

  imgContainer.querySelector("img").src = `${userData.avatar}`;
  imgContainer.querySelector("img").alt = `User avatar`;
  profileinfoBox.querySelector("h1").innerText = `${userData.name}`;
  profileinfoBox.querySelector("h2").innerText = `${userData.email}`;
  creditsContainer.querySelector("h2").innerText = "Credits:";
  creditsContainer.querySelector("p").innerText = `${userData.credits}`;
  activeBids.querySelector("h2").innerText = "Active bids:";
  activeBids.querySelector("p").innerText = `${lastBid.length}`;
  listings.querySelector("h2").innerText = "Listings:";
  listings.querySelector("p").innerText = `${userData._count.listings}`;

  imgCheckError();
}

/**
 * Shows a uses listings data on profile page.
 * @param {string} listing Data from api call
 */
function profileListingsCard(listing) {
  const currentDate = new Date();
  const listingDate = new Date(listing.endsAt);

  const listingsSection = document.getElementById("listingsSection");
  const cardContainer = document.createElement("div");
  const editSection = document.createElement("div");
  const editLink = document.createElement("a");
  const editBtn = document.createElement("button");
  const listingContainer = document.createElement("div");
  const listingLink = document.createElement("a");
  const auctionContainer = document.createElement("div");
  const listingTitle = document.createElement("h2");
  const listingImg = document.createElement("img");
  const infoContainer = document.createElement("div");
  const listingDescription = document.createElement("h3");
  const listingEndTime = document.createElement("h4");
  const listingHighestBid = document.createElement("h5");

  listingsSection.append(cardContainer);
  cardContainer.append(editSection);
  editSection.append(editLink);
  editLink.append(editBtn);
  cardContainer.append(listingContainer);
  listingContainer.append(listingLink);
  listingLink.append(auctionContainer);
  auctionContainer.append(listingTitle);
  auctionContainer.append(listingImg);
  auctionContainer.append(infoContainer);
  infoContainer.append(listingDescription);
  infoContainer.append(listingEndTime);
  infoContainer.append(listingHighestBid);

  cardContainer.className = "card h-100 m-3 listing-card col-11 col-md-5 col-xl-3";
  editSection.className = "align-self-end";
  editLink.className = "text-decoration-none";
  editBtn.className = "btn-style profile-listing-btn-style p-2";
  listingLink.className = "text-decoration-none text-reset";
  listingTitle.className = "fw-bold border-0 ps-3 pt-2";
  listingImg.className = "auction-img img-check";
  infoContainer.className = "d-flex flex-column align-items-center m-2";

  editSection.querySelector("a").href = `/profile/edit-listing.html?id=${listing.id}`;
  editSection.querySelector("button").innerText = `Edit`;
  listingContainer.querySelector("a").href = `/listing/index.html?id=${listing.id}`;
  auctionContainer.querySelector("h2").innerText = `${listing.title}`;

  if (listing.media.length > 0) {
    auctionContainer.querySelector("img").src = `${listing.media[0]}`;
    auctionContainer.querySelector("img").alt = `Product image`;
  } else {
    auctionContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
    auctionContainer.querySelector("img").alt = `No product image available`;
  }

  infoContainer.querySelector("h3").innerText = `${listing.description}`;

  if (currentDate < listingDate) {
    const endData = "h4";
    getCountdownDate(listing, infoContainer, endData);
  } else {
    infoContainer.querySelector("h4").innerText = `Ended`;
  }

  if (listing.bids.length === 0) {
    infoContainer.querySelector("h5").innerText = "No bids yet";
  } else {
    let bidValues = [];
    Object.values(listing.bids).forEach(function (data) {
      const bids = data.amount;
      bidValues.push(bids);
      const highestBid = Math.max(...bidValues);
      infoContainer.querySelector("h5").innerText = `Highest bid: ${highestBid}`;
    });
  }

  imgCheckError();
}

/**
 * Shows active listings a user has bid on, on profile page.
 * @param {string} bidData Data from api call
 */
function profileBidCard(bidData) {
  const currentDate = new Date();
  const listingDate = new Date(bidData.listing.endsAt);

  const listingsSection = document.getElementById("listingsSection");
  const cardContainer = document.createElement("div");
  const listingContainer = document.createElement("div");
  const listingLink = document.createElement("a");
  const auctionContainer = document.createElement("div");
  const listingTitle = document.createElement("h2");
  const listingImg = document.createElement("img");
  const infoContainer = document.createElement("div");
  const listingDescription = document.createElement("h3");
  const listingEndTime = document.createElement("h4");
  const listingHighestBid = document.createElement("h5");

  listingsSection.append(cardContainer);
  cardContainer.append(listingContainer);
  listingContainer.append(listingLink);
  listingLink.append(auctionContainer);
  auctionContainer.append(listingTitle);
  auctionContainer.append(listingImg);
  auctionContainer.append(infoContainer);
  infoContainer.append(listingDescription);
  infoContainer.append(listingEndTime);
  infoContainer.append(listingHighestBid);

  cardContainer.className = "card h-100 m-3 listing-card col-11 col-md-5 col-xl-3";
  listingLink.className = "text-decoration-none text-reset";
  listingTitle.className = "fw-bold border-0 ps-3 pt-2";
  listingImg.className = "auction-img img-check";
  infoContainer.className = "d-flex flex-column align-items-center m-2";

  listingContainer.querySelector("a").href = `/listing/index.html?id=${bidData.listing.id}`;
  auctionContainer.querySelector("h2").innerText = `${bidData.listing.title}`;
  if (bidData.listing.media.length !== 0) {
    auctionContainer.querySelector("img").src = `${bidData.listing.media[0]}`;
    auctionContainer.querySelector("img").alt = `Product image`;
  } else {
    auctionContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
    auctionContainer.querySelector("img").alt = `No product image available`;
  }
  infoContainer.querySelector("h3").innerText = `${bidData.listing.description}`;

  if (currentDate < listingDate) {
    const endData = "h4";
    getCountdownDate(bidData.listing, infoContainer, endData);
  } else {
    infoContainer.querySelector("h4").innerText = `Ended`;
  }

  infoContainer.querySelector("h5").innerText = `My bid: ${bidData.amount}`;

  imgCheckError();
}

/**
 * Shows a users wins, on profile page.
 * @param {string} winData Data from api call
 */
function profileWinCard(winData) {
  const listingsSection = document.getElementById("listingsSection");
  const cardContainer = document.createElement("div");
  const listingContainer = document.createElement("div");
  const listingLink = document.createElement("a");
  const auctionContainer = document.createElement("div");
  const listingTitle = document.createElement("h2");
  const listingImg = document.createElement("img");
  const infoContainer = document.createElement("div");
  const listingDescription = document.createElement("h3");
  const listingHighestBid = document.createElement("h5");

  listingsSection.append(cardContainer);
  cardContainer.append(listingContainer);
  listingContainer.append(listingLink);
  listingLink.append(auctionContainer);
  auctionContainer.append(listingTitle);
  auctionContainer.append(listingImg);
  auctionContainer.append(infoContainer);
  infoContainer.append(listingDescription);
  infoContainer.append(listingHighestBid);

  cardContainer.className = "card h-100 m-3 listing-card col-11 col-md-5 col-xl-3";
  listingLink.className = "text-decoration-none text-reset";
  listingTitle.className = "fw-bold border-0 ps-3 pt-2";
  listingImg.className = "auction-img img-check";
  infoContainer.className = "d-flex flex-column align-items-center m-2";

  listingContainer.querySelector("a").href = `/listing/index.html?id=${winData.listing.id}`;
  auctionContainer.querySelector("h2").innerText = `${winData.listing.title}`;
  if (winData.listing.media.length !== 0) {
    auctionContainer.querySelector("img").src = `${winData.listing.media[0]}`;
    auctionContainer.querySelector("img").alt = `Product image`;
  } else {
    auctionContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
    auctionContainer.querySelector("img").alt = `No product image available`;
  }
  infoContainer.querySelector("h3").innerText = `${winData.listing.description}`;
  infoContainer.querySelector("h5").innerText = `My bid: ${winData.amount}`;

  imgCheckError();
}

/**
 * Shows a user's listing shown in input ready to be edited.
 * @param {string} listingData Data from api call
 */
function listingEdit(listingData) {
  const mediaSection = document.getElementById("listing-media");

  document.getElementById("listing-title").value = `${listingData.title}`;
  document.getElementById("listing-description").value = `${listingData.description}`;
  document.getElementById("listing-tags").value = `${listingData.tags}`;

  if (listingData.media.length > 1) {
    Object.values(listingData.media).forEach(function (img) {
      const mediaUrl = document.createElement("input");
      mediaUrl.className = "form-control listing-media-input";
      mediaSection.append(mediaUrl);

      const collectionImg = document.querySelectorAll(".listing-media-input");
      for (let i = 0; i < collectionImg.length; i++) {
        collectionImg[i].addEventListener("click", ShowTestImage);
        collectionImg[i].addEventListener("input", ShowTestImage);
      }

      mediaUrl.value = `${img}`;
    });
  }
}

/**
 * Hides buttons unless other functions give them a different value
 */
function diplayButtonStyle() {
  document.querySelector("#show-more-listing-btn").style.display = "none";
  document.querySelector("#show-less-listing-btn").style.display = "none";
  document.querySelector("#show-more-ending-btn").style.display = "none";
  document.querySelector("#show-less-ending-btn").style.display = "none";
  document.querySelector("#show-more-popular-btn").style.display = "none";
  document.querySelector("#show-less-popular-btn").style.display = "none";
}

export {
  listingsCard,
  popularListingsCard,
  listingPage,
  userCredits,
  bidsList,
  userHeader,
  profileStyle,
  profileListingsCard,
  profileBidCard,
  profileWinCard,
  listingEdit,
  diplayButtonStyle,
};
