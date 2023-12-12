import { getCountdownDate, getPreciseCountdownDate } from "./dateCountdown.js";
const endDateSetup = {
  second: "numeric",
  minute: "numeric",
  hour: "numeric",
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

const simpleEndDateSetup = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

const path = location.pathname;

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
  profileAvatar.className = "profile-img";
  profileinfoBox.className = "align-self-center grid-b text-center";
  creditBidsListings.className = "d-flex flex-column gap-3 grid-c align-self-center";
  creditsContainer.className = "col-12 d-flex flex-row justify-content-center gap-1";
  bidsAndListings.className = "d-flex justify-content-center align-self-center gap-3 bids-list";
  activeBids.className = "col-6 d-flex flex-row gap-2 bids";
  listings.className = "col-6 d-flex flex-row gap-2 list";

  imgContainer.querySelector("img").src = `${userData.avatar}`;
  profileinfoBox.querySelector("h1").innerText = `${userData.name}`;
  profileinfoBox.querySelector("h2").innerText = `${userData.email}`;
  creditsContainer.querySelector("h2").innerText = "Credits:";
  creditsContainer.querySelector("p").innerText = `${userData.credits}`;
  activeBids.querySelector("h2").innerText = "Active bids:";
  activeBids.querySelector("p").innerText = `${lastBid.length}`;
  listings.querySelector("h2").innerText = "Listings:";
  // listings.querySelector("p").innerText = `${userData.length}`;
  listings.querySelector("p").innerText = `${userData._count.listings}`;
}

function listingsCard(listing, listingsSection) {
  const currentDate = new Date();
  const listingDate = new Date(listing.endsAt);
  // let listingdate = new Date(listing.endsAt);
  // const listingEndDate = listingdate.toLocaleString("ko-KR", endDateSetup);
  // const currentDateData = new Date();
  // const currentDate = currentDateData.toLocaleString("ko-KR", endDateSetup);

  // const listingsSection = document.getElementById("listingsSection");
  const cardContainer = document.createElement("div");
  const listingLink = document.createElement("a");
  // const userContainer = document.createElement("div");
  // const userInfo = document.createElement("h2");
  // const userImg = document.createElement("img");
  const auctionContainer = document.createElement("div");
  const listingTitle = document.createElement("h2");
  const imgContainer = document.createElement("div");
  const listingImg = document.createElement("img");
  const infoContainer = document.createElement("div");
  const listingDescription = document.createElement("h3");
  const listingEndTime = document.createElement("h4");
  const listingHighestBid = document.createElement("h5");

  listingsSection.append(cardContainer);
  // cardContainer.append(userContainer);
  // userContainer.append(userInfo);
  // userContainer.append(userImg);
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
  // listingImg.setAttribute("id", "listing-img");
  infoContainer.className = "d-flex flex-column align-items-center m-2";
  // listingEndTime.setAttribute("id", "endTimeCountdown");

  // console.log("hello", listing.endsAt);
  // userContainer.querySelector("h2").innerText = `${listing.name}`;
  // userContainer.querySelector("img").src = `${listing.avatar}`;
  cardContainer.querySelector("a").href = `/feed/index.html?id=${listing.id}`;
  auctionContainer.querySelector("h2").innerText = `${listing.title}`;

  const cardImg = document.querySelectorAll("#listing-img");

  if (listing.media.length !== 0) {
    // || listing.media[0] !== "undefined"
    // || cardImg.naturalHeight !== 0
    // const img = new Image();
    imgContainer.querySelector("img").src = `${listing.media[0]}`;
    // img.onerror = function () {
    //   auctionContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
    // };
    // console.log(cardImg[4].naturalHeight);
  } else {
    // console.log(cardImg);
    // const img = new Image();
    imgContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
    // img.onerror = function () {
    //   auctionContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
    // };
  }

  infoContainer.querySelector("h3").innerText = `${listing.description}`;

  if (currentDate < listingDate) {
    const endData = "h4";
    getCountdownDate(listing, infoContainer, endData);
  } else {
    infoContainer.querySelector("h4").innerText = `Ended`;
  }

  // if (path !== "/profile/index.html") {
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
  // }
  // else {
  //   infoContainer.querySelector("h5").innerText = "hello";
  // }
}

function listingPage(listingData) {
  const currentDate = new Date();
  const listingDate = new Date(listingData.endsAt);
  // const currentDateData = new Date();
  // const currentDate = currentDateData.toLocaleString("ja-JP-u-ca-japanese", endDateSetup);
  // let listingdate = new Date(listingData.endsAt);
  // const listingEndDate = listingdate.toLocaleString("ja-JP-u-ca-japanese", endDateSetup);

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
  // const bidsContainer = document.createElement("div");
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
  sellerAvatar.className = "header-profile-img mb-0";
  listingContainer.className = "d-flex flex-column align-items-center px-3 text-center specific-listing";
  listingTitle.className = "grid-b mt-4";
  listingimgBox.className = "grid-c specific-listing-style";
  listingImg.className = "specific-listing-main-img";
  ImgCollectionSection.className = "d-flex specific-img-collection justify-content-center";
  infoContainer.className = "d-flex flex-column-reverse align-items-center gap-4 grid-d ";
  listingDescription.className = "mx-3 mb-3 specific-info-container";
  // listingEndTime.className = "endTime";

  listingImg.setAttribute("id", "listing-img");
  const imgeee = document.getElementById("listing-img");

  imgeee.onerror = function () {
    listingContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
    console.log("hello?????????????");
  };

  console.log(listingData);

  listingContainer.querySelector("h1").innerText = `${listingData.title}`;
  if (listingData.media.length !== 0) {
    listingimgBox.querySelector("img").src = `${listingData.media[0]}`;
  } else {
    listingimgBox.querySelector("img").src = `/images/no-img-avaliable.webp`;
  }

  if (listingData.media.length > 1) {
    Object.values(listingData.media).forEach(function (img) {
      const listingImgCollection = document.createElement("div");
      const imgCollection = document.createElement("img");

      ImgCollectionSection.append(listingImgCollection);
      listingImgCollection.append(imgCollection);

      imgCollection.className = "collection-img";
      // imgCollection.setAttribute("id", "collection-img");

      const collectionImg = document.querySelectorAll(".collection-img");
      for (let i = 0; i < collectionImg.length; i++) {
        collectionImg[i].addEventListener("click", function () {
          console.log(this.src);
          listingimgBox.querySelector("img").src = this.src;
        });
      }
      listingImgCollection.querySelector("img").src = `${img}`;
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
    // const endData = "h3";
    // getPreciseCountdownDate(listingData, infoContainer, endData);
  } else {
    infoContainer.append(listingEndTime);

    listingEndTime.className = "endTime";

    infoContainer.querySelector("h3").innerText = `Ended`;
  }

  infoContainer.querySelector("h2").innerText = `${listingData.description}`;

  profileContainer.querySelector("img").src = `${listingData.seller.avatar}`;
  sellerText.querySelector("h2").innerText = `${listingData.seller.name}`;
  sellerText.querySelector("h3").innerText = `${listingData.seller.email}`;
}

function userCredits(userData) {
  const creditSection = document.getElementById("user-credits");
  const bidSection = document.createElement("div");
  const bidCredit = document.createElement("h2");
  // const bidDiv = document.createElement("div");
  // const bidInput = document.createElement("input");
  // const bidBtn = document.createElement("button");

  creditSection.append(bidSection);
  bidSection.append(bidCredit);
  // bidSection.append(bidDiv);
  // bidDiv.append(bidInput);
  // bidSection.append(bidBtn);

  bidSection.className = "d-inline-grid gap-2";
  // bidInput.className = "input-style";
  // bidBtn.className = "bid-btn";
  // bidBtn.setAttribute("id", "bid-btn");
  // bidInput.setAttribute("id", "bid-valuet");
  // bidBtn.setAttribute("type", "submit");

  // console.log(userData.credits);
  bidSection.querySelector("h2").innerText = `Your credit: ${userData.credits}`;
  // bidSection.querySelector("input");
  // bidSection.querySelector("button").innerText = `Place bid`;
  // bidSection.querySelector("button").type = `submit`;
  // // document.getElementById("bid-btn").innerText = `Place bid`;
}

function bidsList(highestBid) {
  // let ListingBidDate = new Date(highestBid.created);
  // const ListingBidCreated = ListingBidDate.toLocaleString("en-GB", simpleEndDateSetup);

  const bidSection = document.getElementById("listing-bids");
  const bidList = document.createElement("li");
  const bidInfo = document.createElement("div");
  const bid = document.createElement("div");
  const bidListBids = document.createElement("h2");
  // const bidDate = document.createElement("div");
  // const date = document.createElement("h2");
  const bidder = document.createElement("div");
  const bidderName = document.createElement("h2");

  bidSection.append(bidList);
  bidList.append(bidInfo);
  bidInfo.append(bid);
  bid.append(bidListBids);
  // bidInfo.append(bidDate);
  // bidDate.append(date);
  bidInfo.append(bidder);
  bidder.append(bidderName);

  bidList.className = "d-flex justify-content-evenly col-12 list-group-item gap-5 px-4 pt-2";
  bidInfo.className = "d-flex gap-5 col-10";
  bid.className = "col-4";
  bidder.className = "col-6";

  // console.log("123", highestBid.amount);
  bid.querySelector("h2").innerText = `${highestBid.amount},-`;
  // bidDate.querySelector("h2").innerText = `Bid time: ${ListingBidCreated},`;
  bidder.querySelector("h2").innerText = ` ${highestBid.bidderName}`;
}

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
  editBtn.className = "btn-style profile-listing-btn-style";
  listingLink.className = "text-decoration-none text-reset";
  listingTitle.className = "fw-bold border-0 ps-3 pt-2";
  listingImg.className = "auction-img";
  infoContainer.className = "d-flex flex-column align-items-center m-2";

  editSection.querySelector("a").href = `/profile/edit-listing.html?id=${listing.id}`;
  editSection.querySelector("button").innerText = `Edit`;
  listingContainer.querySelector("a").href = `/feed/index.html?id=${listing.id}`;
  auctionContainer.querySelector("h2").innerText = `${listing.title}`;

  if (listing.media.length !== 0) {
    auctionContainer.querySelector("img").src = `${listing.media[0]}`;
  } else {
    // listingImg.className = "d-none";
    auctionContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
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
}

function listingEdit(listingData) {
  console.log(listingData);
  const mediaSection = document.getElementById("listing-media");
  // const mediainputBox = document.createElement("div");
  // mediaSection.append(mediainputBox);

  document.getElementById("listing-title").value = `${listingData.title}`;
  document.getElementById("listing-description").value = `${listingData.description}`;
  document.getElementById("listing-tags").value = `${listingData.tags}`;

  if (listingData.media.length > 1) {
    Object.values(listingData.media).forEach(function (img) {
      const mediaUrl = document.createElement("input");
      mediaUrl.className = "form-control listing-media-input";
      mediaSection.append(mediaUrl);

      mediaUrl.value = `${img}`;
    });
  } else {
    const mediaUrl = document.createElement("input");
    mediaSection.append(mediaUrl);
    mediaUrl.className = "form-control listing-media-input";

    mediaUrl.value = `${listingData.media}`;
  }

  const collectionImg = document.querySelectorAll(".listing-media-input");
  for (let i = 0; i < collectionImg.length; i++) {
    collectionImg[i].addEventListener("click", function () {
      console.log(this.value);
      document.getElementById("edit-img-display").src = this.value;
      console.log("hei");
    });
  }
}

function profileBidCard(bidData) {
  const currentDate = new Date();
  const listingDate = new Date(bidData.listing.endsAt);
  // const currentDateData = new Date();
  // const currentDate = currentDateData.toLocaleString("en-GB", endDateSetup);
  // let listingdate = new Date(bidData.listing.endsAt);
  // const listingEndDate = listingdate.toLocaleString("en-GB", endDateSetup);

  const listingsSection = document.getElementById("listingsSection");
  // const listingsSection = document.getElementById("myBidsSection");
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
  listingImg.className = "auction-img";
  infoContainer.className = "d-flex flex-column align-items-center m-2";

  listingContainer.querySelector("a").href = `/feed/index.html?id=${bidData.listing.id}`;
  auctionContainer.querySelector("h2").innerText = `${bidData.listing.title}`;
  if (bidData.listing.media.length !== 0) {
    auctionContainer.querySelector("img").src = `${bidData.listing.media[0]}`;
  } else {
    // listingImg.className = "d-none";
    auctionContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
  }
  infoContainer.querySelector("h3").innerText = `${bidData.listing.description}`;

  if (currentDate < listingDate) {
    const endData = "h4";
    getCountdownDate(bidData.listing, infoContainer, endData);
  } else {
    infoContainer.querySelector("h4").innerText = `Ended`;
  }

  // let bidValues = [];
  // Object.values(listing.bids).forEach(function (data) {
  // const bids = data.amount;
  // bidValues.push(bids);
  // const highestBid = Math.max(...bidValues);
  infoContainer.querySelector("h5").innerText = `My bid: ${bidData.amount}`;
  // });
  // }
}

function profileWinCard(winData) {
  const listingsSection = document.getElementById("listingsSection");
  // const listingsSection = document.getElementById("myWinSection");
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
  listingImg.className = "auction-img";
  infoContainer.className = "d-flex flex-column align-items-center m-2";

  listingContainer.querySelector("a").href = `/feed/index.html?id=${winData.listing.id}`;
  auctionContainer.querySelector("h2").innerText = `${winData.listing.title}`;
  if (winData.listing.media.length !== 0) {
    auctionContainer.querySelector("img").src = `${winData.listing.media[0]}`;
  } else {
    auctionContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
  }
  infoContainer.querySelector("h3").innerText = `${winData.listing.description}`;
  infoContainer.querySelector("h5").innerText = `My bid: ${winData.amount}`;
}

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
  profileAvatar.className = "header-profile-img";

  headerProfileSection.querySelector("a").href = `/profile/index.html`;
  textBox.querySelector("h2").innerText = `${userData.name}`;
  textBox.querySelector("h3").innerText = `Your credit: ${userData.credits}`;
  headerProfileLink.querySelector("img").src = `${userData.avatar}`;
}

export {
  profileStyle,
  listingsCard,
  listingPage,
  userCredits,
  bidsList,
  profileListingsCard,
  listingEdit,
  profileBidCard,
  profileWinCard,
  userHeader,
};
