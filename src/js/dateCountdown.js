// Refrence: How to create a countdown timer using JavaScript "https://www.educative.io/answers/how-to-create-a-countdown-timer-using-javascript"

/**
 * Finds and displays a listings date/time left based on today's date minus the list's end date.
 * @param {string} listing Listing data for one listing.
 * @param {string} infoContainer The location where the time should be displayed on the html page.
 * @param {string} endData Html tags used.
 */
function getCountdownDate(listing, infoContainer, endData) {
  try {
    setInterval(function () {
      const listingdate = new Date(listing.endsAt).getTime();
      const currentDate = new Date().getTime();
      const timeDifferent = listingdate - currentDate;

      const days = Math.floor(timeDifferent / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifferent % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifferent % (1000 * 60 * 60)) / (1000 * 60));

      const endDateCountdown = days + "D " + hours + "H " + minutes + "M";
      infoContainer.querySelector(endData).innerText = `Ends in: ${endDateCountdown}`;
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Finds and displays a listings date/time left based on today's date minus the list's end date.
 * @param {string} listing Listing data for one listing.
 * @param {string} daysSection The location where days should be displayed on the html page.
 * @param {string} hoursSection The location where hours should be displayed on the html page.
 * @param {string} minSection The location where minutes should be displayed on the html page.
 * @param {string} secSection The location where seconds should be displayed on the html page.
 * @param {string} endData Html tags used.
 */
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

      daysSection.querySelector(endData).innerText = `${days}`;
      hoursSection.querySelector(endData).innerText = `${hours}`;
      minSection.querySelector(endData).innerText = `${minutes}`;
      secSection.querySelector(endData).innerText = `${seconds}`;
    });
  } catch (error) {
    console.log(error);
  }
}

export { getCountdownDate, getPreciseCountdownDate };
