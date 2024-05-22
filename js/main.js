import { createNode } from "./utilities.js";
import { showGameDetails } from "./details.js";

export const urlApi = "https://free-to-play-games-database.p.rapidapi.com/api";
console.log(urlApi);

const urlAllGames = urlApi.concat("/games");
const urlWebGames = urlApi.concat("/games?platform=browser");
const urlPcGames = urlApi.concat("/games?platform=pc");
const urlSorted = urlApi.concat("/games?sort-by=alphabetical");
export const output = document.getElementById("output");
export const currentLocation = window.location.pathname;
// console.log(currentLocation);

if (currentLocation === "/" || currentLocation === "/JS-API-PROJECT/") {
  const allGames = document.getElementById("all-games");
  const webGames = document.getElementById("web-games");
  const pcGames = document.getElementById("pc-games");

  //display All games by default
  getGamesData(urlAllGames);
  allGames.classList.add("specialColor");

  //choose platform

  allGames.addEventListener("click", () => {
    webGames.classList.remove("specialColor");
    pcGames.classList.remove("specialColor");
    allGames.classList.add("specialColor");
    getGamesData(urlAllGames);
  });
  webGames.addEventListener("click", () => {
    allGames.classList.remove("specialColor");
    pcGames.classList.remove("specialColor");
    webGames.classList.add("specialColor");
    getGamesData(urlWebGames);
  });
  pcGames.addEventListener("click", () => {
    webGames.classList.remove("specialColor");
    allGames.classList.remove("specialColor");
    pcGames.classList.add("specialColor");
    getGamesData(urlPcGames);
  });

  //choose platform MOBILE VERSION

  const selectPlatformMobile = document.querySelector(".mobileMenuSelection");
  const dropdownMenuMobile = document.querySelector(".dropdownMenu");

  selectPlatformMobile.addEventListener("click", () => {
    dropdownMenuMobile.classList.toggle("menu-open");
  });

  const allGamesMobile = document.getElementById("allGamesMobile");
  const webGamesMobile = document.getElementById("webGamesMobile");
  const browserGamesMobile = document.getElementById("browserGamesMobile");

  allGamesMobile.addEventListener("click", () => {
    dropdownMenuMobile.classList.remove("menu-open");
    getGamesData(urlAllGames);
  });
  webGamesMobile.addEventListener("click", () => {
    dropdownMenuMobile.classList.remove("menu-open");
    getGamesData(urlWebGames);
  });
  browserGamesMobile.addEventListener("click", () => {
    dropdownMenuMobile.classList.remove("menu-open");
    getGamesData(urlPcGames);
  });

  /* ----------- Show / Hide Platform Menu (Standart/mobile Version) ---------- */
  // const menuButton = document.querySelector(".choose");
  // const menuLinks = document.querySelector("#platform-buttons");

  // menuButton.addEventListener("click", () => {
  //   menuLinks.classList.toggle("hidden");
  //   menuLinks.classList.toggle("flex");
  // });
}

/* ------------------- Main Function To Get Data From API ------------------- */
export async function getGamesData(url) {
  const options = {
    method: "GET",
    params: {
      "sort-by": "alphabetical",
    },
    headers: {
      "X-RapidAPI-Key": "bcfe5a59efmsh9f6626c627741d7p1468f3jsnf0bd5aa9c906",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const result = await response.json();
      updateDisplay(result);
    } else {
      console.log("Could not fetch data");
      output.innerText = "Something got wrong";
    }
  } catch (error) {
    console.error(error);
    output.innerText = "An error occurred when fetching data";
  }
}

/* ----------------------- Display Data On The Screen ----------------------- */

function updateDisplay(array) {
  /* Updated switchcase */
  switch (currentLocation) {
    case "/":
    case "/JS-API-PROJECT/":
      showGames(array);
      break;
    case "/details.html":
    case "/JS-API-PROJECT/details.html":
      showGameDetails(array);
      break;
  }
}

/* -------------------- Create HTML Elements (index Page) ------------------- */
function showGames(array) {
  if (array) {
    output.innerText = "";
  }
  let alt = "";
  let iconPath = "";
  array.forEach((element) => {
    const card = createNode("div", {
      class: "flex column card",
    });
    const thumb = createNode("img", {
      src: element.thumbnail,
      alt: element.title,
      title: element.title,
    });
    thumb.classList.add("thumbImg");

    const title = createNode("h2", {});
    title.innerText = element.title;

    const shortDesc = createNode("p", {
      id: "cardDescription",
    });
    shortDesc.innerText = element.short_description;

    const bottomCardContainer = createNode("div", {});
    const details = createNode("div", {
      class: "flex card-details",
    });

    const readMoreContainer = createNode("div", {
      class: "readMoreContainer",
    });
    const readMore = createNode("a", {
      href: `details.html?id=${element.id}`,
      // target: "_blank",
      role: "button",
    });
    readMore.innerText = "Read more";
    readMoreContainer.appendChild(readMore);

    const platformArray = element.platform.split(", ");
    platformArray.map((item) => {
      if (item === "Web Browser") {
        alt = "Browser-based game";
        iconPath = "images/web.png";
      } else {
        alt = "Available on Windows";
        iconPath = "images/windows.png";
      }
      const platform = createNode("img", {
        src: iconPath,
        alt: alt,
        title: alt,
      });
      details.appendChild(platform);
    });
    const genre = createNode("p", {});
    genre.innerText = element.genre;

    details.appendChild(genre);
    bottomCardContainer.append(readMoreContainer, details);
    card.append(thumb, title, shortDesc, bottomCardContainer);
    output.appendChild(card);
  });
}

/* ------------------- Searching Data From API ------------------- */
const searchBTN = document.getElementById("searchBTN");

searchBTN.oninput = function () {
  const value = this.value.toLowerCase().trim();
  const searchedCards = document.querySelectorAll(".card");

  searchedCards.forEach(function (elem) {
    const title = elem.querySelector("h2").innerText.toLowerCase();

    if (value !== "") {
      if (title.search(value) === -1) {
        elem.classList.add("hide");
        console.log(title);
      } else {
        elem.classList.remove("hide");
      }
    } else {
      searchedCards.forEach(function (elem) {
        elem.classList.remove("hide");
      });
    }
  });
};

/* ----------- Mobile vesion search ---------- */

const searchButtonMob = document.getElementById("searchIconMob");
const filterButtonMob = document.getElementById("filterIconMob");
const sortButtonMob = document.getElementById("sortIconMob");
const mobileNav = document.getElementById("mobileNav");

const searchFieldDiv = createNode("div", {});
const searchField = createNode("input", {
  type: "search",
  id: "searchMobile",
});
searchFieldDiv.append(searchField);
mobileNav.append(searchFieldDiv);
searchFieldDiv.classList.add("hidden");

let isClicked = false;

searchButtonMob.addEventListener("click", () => {
  if (!isClicked) {
    console.log("clicked");
    searchFieldDiv.classList.remove("hidden");
    filterButtonMob.classList.add("hidden");
    sortButtonMob.classList.add("hidden");
    console.log("Button clicked for the first time");
    isClicked = true;
  } else {
    searchFieldDiv.classList.add("hidden");
    filterButtonMob.classList.remove("hidden");
    sortButtonMob.classList.remove("hidden");
    console.log("Button clicked again");
    isClicked = false; // Reset the state for the next click
  }
});

searchField.oninput = function () {
  const value = this.value.toLowerCase().trim();
  const searchedCards = document.querySelectorAll(".card");

  searchedCards.forEach(function (elem) {
    const title = elem.querySelector("h2").innerText.toLowerCase();

    if (value !== "") {
      if (title.search(value) === -1) {
        elem.classList.add("hide");
        console.log(title);
      } else {
        elem.classList.remove("hide");
      }
    } else {
      searchedCards.forEach(function (elem) {
        elem.classList.remove("hide");
      });
    }
  });
};

/* ------------------- Sorting for WEB ------------------- */

const sortIcon = document.getElementById("sort-icon");

let sortIsClicked = false;

sortIcon.addEventListener("click", () => {
  console.log("sorting is clicked");

  if (!sortIsClicked) {
    console.log("clicked");
    getGamesData(urlSorted);
    sortIsClicked = true;
  } else {
    console.log("Button clicked again");
    getGamesData(urlAllGames);
    sortIsClicked = false;
  }
});

/* ------------------- Sorting for Mobile ------------------- */

const sortIconMob = document.getElementById("sortIconMob");

let sortMobIsClicked = false;

sortIconMob.addEventListener("click", () => {
  console.log("sorting is clicked");
  if (!sortMobIsClicked) {
    console.log("clicked");
    getGamesData(urlSorted);
    sortMobIsClicked = true;
  } else {
    console.log("Button clicked again");
    getGamesData(urlAllGames);
    sortMobIsClicked = false;
  }
});
