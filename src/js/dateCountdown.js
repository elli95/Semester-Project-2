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

function getPreciseCountdownDate(listing, daysSection, hoursSection, minSection, secSection, endData) {
  try {
    setInterval(function () {
      const listingdate = new Date(listing.endsAt).getTime();
      const currentDate = new Date().getTime();
      const timeDifferent = listingdate - currentDate;

      const days = Math.floor(timeDifferent / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifferent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifferent % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifferent % (1000 * 60)) / 1000);

      // const endDateCountdown = days + " Days " + hours + " Hours " + minutes + " Min " + seconds + " Sec";

      // const timeSection = document.createElement("div");
      // const daysSection = document.createElement("div");
      // const daysText = document.createElement("h2");
      // const hoursSection = document.createElement("div");
      // const hoursText = document.createElement("h2");
      // const minSection = document.createElement("div");
      // const minText = document.createElement("h2");
      // const secSection = document.createElement("div");
      // const secText = document.createElement("h2");

      // infoContainer.append(timeSection);
      // timeSection.append(daysSection);
      // daysSection.append(daysText);
      // timeSection.append(hoursSection);
      // hoursSection.append(hoursText);
      // timeSection.append(minSection);
      // minSection.append(minText);
      // timeSection.append(secSection);
      // secSection.append(secText);

      daysSection.querySelector(endData).innerText = `${days}`;
      hoursSection.querySelector(endData).innerText = `${hours}`;
      minSection.querySelector(endData).innerText = `${minutes}`;
      secSection.querySelector(endData).innerText = `${seconds}`;
      // infoContainer.querySelector(endData).innerText = `Ends in: ${endDateCountdown}`;
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
