import { createNode } from "./utilities.js";
import { showGameDetails } from "./details.js";

export const urlApi = "https://free-to-play-games-database.p.rapidapi.com/api";
console.log(urlApi);

const urlAllGames = urlApi.concat("/games");
const urlWebGames = urlApi.concat("/games?platform=browser");
const urlPcGames = urlApi.concat("/games?platform=pc");
export const output = document.getElementById("output");
export const currentLocation = window.location.pathname;
// console.log(currentLocation);

// const searchInput = document.getElementById("searchBTN");

if (currentLocation === "/" || currentLocation === "/JS-API/") {
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

  /* ----------- Show / Hide Platform Menu (Standart/mobile Version) ---------- */
  const menuButton = document.querySelector(".choose");
  const menuLinks = document.querySelector("#platform-buttons");

  menuButton.addEventListener("click", () => {
    menuLinks.classList.toggle("hidden");
    menuLinks.classList.toggle("flex");
  });
}

/* ------------------- Main Function To Get Data From API ------------------- */
export async function getGamesData(url) {
  const options = {
    method: "GET",
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
    case "/JS-API/":
      showGames(array);
      break;
    case "/JS-API/details.html":
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
    const title = createNode("h2", {});
    title.innerText = element.title;
    const shortDesc = createNode("p", {});
    shortDesc.innerText = element.short_description;
    const details = createNode("div", {
      class: "flex card-details",
    });

    const readMore = createNode("a", {
      href: `details.html?id=${element.id}`,
      target: "_blank",
      role: "button",
    });
    readMore.innerText = "Read more";

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
    card.append(thumb, title, shortDesc, readMore, details);
    output.appendChild(card);
  });
}

/* ------------------- Searching Data From API ------------------- */

document.getElementById("searchBTN").oninput = function () {
  const value = this.value.toLowerCase().trim();
  console.log(value);
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

/* ------------------- Filtering Data From API ------------------- */

// const filter = document.getElementById("filter-icon");

// filter.addEventListener("click", () => {
//   const filterItem = createNode("p", {});
//   filterItem.innerText = element.genre;
// });
