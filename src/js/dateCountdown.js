// Refrence: How to create a countdown timer using JavaScript "https://www.educative.io/answers/how-to-create-a-countdown-timer-using-javascript"

function getCountdownDate(listing, infoContainer, endData) {
  try {
    setInterval(function () {
      const listingdate = new Date(listing.endsAt).getTime();
      const currentDate = new Date().getTime();
      const timeDifferent = listingdate - currentDate;

      const days = Math.floor(timeDifferent / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifferent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifferent % (1000 * 60 * 60)) / (1000 * 60));
      //   const seconds = Math.floor((timeDifferent % (1000 * 60)) / 1000);

      const endDateCountdown = days + "D " + hours + "H " + minutes + "M";
      infoContainer.querySelector(endData).innerText = `Ends in: ${endDateCountdown}`;
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}

function getPreciseCountdownDate(listing, infoContainer, endData) {
  try {
    setInterval(function () {
      const listingdate = new Date(listing.endsAt).getTime();
      const currentDate = new Date().getTime();
      const timeDifferent = listingdate - currentDate;

      const days = Math.floor(timeDifferent / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifferent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifferent % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifferent % (1000 * 60)) / 1000);

      const endDateCountdown = days + " Days " + hours + " Hours " + minutes + " Min " + seconds + " Sec";
      infoContainer.querySelector(endData).innerText = `Ends in: ${endDateCountdown}`;
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}

export { getCountdownDate, getPreciseCountdownDate };

//
//   const currentDateData = new Date();
//   const currentDate = currentDateData.toLocaleString("en-GB", endDateSetup);

//   if (currentDate < listingEndDate) {
//     const endData = "h4";
//     getCountdownDate(listing, infoContainer, endData);
//   } else {
//     infoContainer.querySelector("h4").innerText = `Ended`;
//   }

// const endData = "h3";
// getCountdownDate(listingData, infoContainer, endData);
