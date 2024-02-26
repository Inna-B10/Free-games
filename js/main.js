import { createNode } from "./utilities.js";
import { showGameDetails } from "./details.js";

export const urlApi = "https://free-to-play-games-database.p.rapidapi.com/api";
const urlAllGames = urlApi.concat("/games");
const urlWebGames = urlApi.concat("/games?platform=browser");
const urlPcGames = urlApi.concat("/games?platform=pc");
export const output = document.getElementById("output");
export const currentLocation = window.location.pathname;

if (currentLocation === "/JS-API/") {
  const allGames = document.getElementById("all-games");
  const webGames = document.getElementById("web-games");
  const pcGames = document.getElementById("pc-games");

  //display All games by default
  getGamesData(urlAllGames);

  //choose platform
  allGames.addEventListener("click", () => {
    getGamesData(urlAllGames);
  });
  webGames.addEventListener("click", () => {
    getGamesData(urlWebGames);
  });
  pcGames.addEventListener("click", () => {
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
      "X-RapidAPI-Key": "33120feaa4msh71483202838c8c0p16d147jsn93fde0d94277",
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
  switch (currentLocation) {
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

    const readMore = createNode("a", {
      href: `details.html?id=${element.id}`,
      target: "_blank",
      role: "button",
    });
    readMore.innerText = "Read more";

    details.appendChild(genre);
    card.append(thumb, title, shortDesc, details, readMore);
    output.appendChild(card);
  });
}
