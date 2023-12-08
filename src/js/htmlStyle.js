const endDateSetup = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
};

const path = location.pathname;

function profileStyle(userData, lastBid) {
  const profileData = document.getElementById("profileData");
  const imgContainer = document.createElement("div");
  const profileAvatar = document.createElement("img");
  const userName = document.createElement("h1");
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
  profileData.append(userName);
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
  userName.className = "align-self-center grid-b";
  creditBidsListings.className = "d-flex flex-column gap-3 grid-c align-self-center";
  creditsContainer.className = "col-12 d-flex flex-row justify-content-center gap-1";
  bidsAndListings.className = "d-flex justify-content-center align-self-center gap-3 bids-list";
  activeBids.className = "col-6 d-flex flex-row gap-2 bids";
  listings.className = "col-6 d-flex flex-row gap-2 list";

  imgContainer.querySelector("img").src = `${userData.avatar}`;
  profileData.querySelector("h1").innerText = `${userData.name}`;
  creditsContainer.querySelector("h2").innerText = "Credits:";
  creditsContainer.querySelector("p").innerText = `${userData.credits}`;
  activeBids.querySelector("h2").innerText = "Active bids:";
  activeBids.querySelector("p").innerText = `${lastBid.length}`;
  listings.querySelector("h2").innerText = "Listings:";
  // listings.querySelector("p").innerText = `${userData.length}`;
  listings.querySelector("p").innerText = `${userData._count.listings}`;
}

function listingsCard(listing) {
  let listingdate = new Date(listing.endsAt);
  const listingEndDate = listingdate.toLocaleString("en-GB", endDateSetup);
  const currentDateData = new Date();
  const currentDate = currentDateData.toLocaleString("en-GB", endDateSetup);

  const listingsSection = document.getElementById("listingsSection");
  const cardContainer = document.createElement("div");
  const listingLink = document.createElement("a");
  // const userContainer = document.createElement("div");
  // const userInfo = document.createElement("h2");
  // const userImg = document.createElement("img");
  const auctionContainer = document.createElement("div");
  const listingTitle = document.createElement("h2");
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
  auctionContainer.append(listingImg);
  auctionContainer.append(infoContainer);
  infoContainer.append(listingDescription);
  infoContainer.append(listingEndTime);
  infoContainer.append(listingHighestBid);

  cardContainer.className = "card h-100 m-3 listing-card col-11 col-md-5 col-xl-3";
  listingLink.className = "text-decoration-none text-reset";
  listingTitle.className = "fw-bold ps-3 pt-2";
  listingImg.className = "auction-img";
  // listingImg.setAttribute("id", "listing-img");
  infoContainer.className = "d-flex flex-column align-items-center m-2";

  // console.log("hello", listing.endsAt);
  // userContainer.querySelector("h2").innerText = `${listing.name}`;
  // userContainer.querySelector("img").src = `${listing.avatar}`;
  cardContainer.querySelector("a").href = `/feed/index.html?id=${listing.id}`;
  auctionContainer.querySelector("h2").innerText = `${listing.title}`;

  // const cardImg = document.querySelectorAll("#listing-img");

  if (listing.media.length !== 0) {
    // || listing.media[0] !== "undefined"
    // || cardImg.naturalHeight !== 0
    // const img = new Image();
    auctionContainer.querySelector("img").src = `${listing.media[0]}`;
    // img.onerror = function () {
    //   auctionContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
    // };
    // console.log(cardImg);
  } else {
    // console.log(cardImg);
    // const img = new Image();
    auctionContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
    // img.onerror = function () {
    //   auctionContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
    // };
  }

  infoContainer.querySelector("h3").innerText = `${listing.description}`;

  // console.log("currentDate", currentDate);
  if (currentDate < listingEndDate) {
    infoContainer.querySelector("h4").innerText = `Ends at: ${listingEndDate}`;
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
  let listingdate = new Date(listingData.endsAt);
  const listingEndDate = listingdate.toLocaleString("en-GB", endDateSetup);

  const listingSection = document.getElementById("specific-listing");
  const listingContainer = document.createElement("div");
  const listingTitle = document.createElement("h1");
  const listingImg = document.createElement("img");
  const ImgCollectionSection = document.createElement("div");
  const infoContainer = document.createElement("div");
  const listingDescription = document.createElement("h2");
  const listingEndTime = document.createElement("h3");
  // const bidsContainer = document.createElement("div");

  listingSection.append(listingContainer);
  listingContainer.append(listingTitle);
  listingContainer.append(listingImg);
  listingContainer.append(ImgCollectionSection);
  listingContainer.append(infoContainer);
  infoContainer.append(listingDescription);
  infoContainer.append(listingEndTime);

  listingContainer.className = "d-flex flex-column align-items-center p-3 text-center specific-listing-style";
  listingTitle.className = "grid-a";
  listingImg.className = "grid-b";
  ImgCollectionSection.className = "d-flex specific-img-collection justify-content-center grid-c";
  infoContainer.className = "d-flex flex-column align-items-center grid-d specific-info-container";
  listingDescription.className = "m-3";
  listingEndTime.className = "endTime";

  console.log(listingData);

  listingContainer.querySelector("h1").innerText = `${listingData.title}`;
  if (listingData.media.length !== 0) {
    listingContainer.querySelector("img").src = `${listingData.media[0]}`;
  } else {
    listingContainer.querySelector("img").src = `/images/no-img-avaliable.webp`;
  }

  if (listingData.media.length > 1) {
    Object.values(listingData.media).forEach(function (img) {
      const listingImgCollection = document.createElement("div");
      const imgCollection = document.createElement("img");

      ImgCollectionSection.append(listingImgCollection);
      listingImgCollection.append(imgCollection);

      imgCollection.setAttribute("id", "collection-img");

      const collectionImg = document.querySelectorAll("#collection-img");
      for (let i = 0; i < collectionImg.length; i++) {
        collectionImg[i].addEventListener("click", function () {
          console.log(this.src);
          listingContainer.querySelector("img").src = this.src;
        });
      }
      listingImgCollection.querySelector("img").src = `${img}`;
    });
  }
  // listingContainer.querySelector("img").src = `${listingData.media}`;
  infoContainer.querySelector("h2").innerText = `${listingData.description}`;
  infoContainer.querySelector("h3").innerText = `Ends at: ${listingEndDate}`;
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
  const bidSection = document.getElementById("listing-bids");
  const bidList = document.createElement("li");
  const bidListBids = document.createElement("h2");

  bidSection.append(bidList);
  bidList.append(bidListBids);

  bidList.className = "d-flex justify-content-evenly list-group-item gap-5 px-3 pt-2";

  // console.log("123", highestBid.amount);
  bidList.querySelector("h2").innerText = `${highestBid.amount}`;
}

function headerSearch(highestBid) {
  console.log("noooooo!", highestBid);
}

function profileListingsCard(listing) {
  let listingdate = new Date(listing.endsAt);
  const listingEndDate = listingdate.toLocaleString("en-GB", endDateSetup);

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
  listingLink.className = "text-decoration-none text-reset";
  listingTitle.className = "fw-bold ps-3 pt-2";
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
  infoContainer.querySelector("h4").innerText = `Ends at: ${listingEndDate}`;

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
  document.getElementById("listing-title").value = `${listingData.title}`;
  document.getElementById("listing-description").value = `${listingData.description}`;
  document.getElementById("listing-tags").value = `${listingData.tags}`;
  document.getElementById("listing-media").value = `${listingData.media}`;
}

function profileBidCard(bidData) {
  let listingdate = new Date(bidData.listing.endsAt);
  const listingEndDate = listingdate.toLocaleString("en-GB", endDateSetup);

  const listingsSection = document.getElementById("myBidsSection");
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
  listingTitle.className = "fw-bold ps-3 pt-2";
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
  infoContainer.querySelector("h4").innerText = `Ends at: ${listingEndDate}`;

  // let bidValues = [];
  // Object.values(listing.bids).forEach(function (data) {
  // const bids = data.amount;
  // bidValues.push(bids);
  // const highestBid = Math.max(...bidValues);
  infoContainer.querySelector("h5").innerText = `My bid: ${bidData.amount}`;
  // });
  // }
}

export { profileStyle, listingsCard, listingPage, userCredits, bidsList, headerSearch, profileListingsCard, listingEdit, profileBidCard };
