import { getGamesData, output } from "./main.js";
import { createNode } from "./utilities.js";

const detailsOutput = document.getElementById("detailsOutput");

/* ----------------------- Get Details Of Current Game ---------------------- */
if (window.location.pathname === "/JS-API/details.html") {
  const gameId = window.location.href.split("=")[1];

  const gameDetailsUrl =
    "https://free-to-play-games-database.p.rapidapi.com/api/game?id=".concat(
      gameId
    );
  getGamesData(gameDetailsUrl);
}

/* -------------------- Create HTML Elements (Details Page) ------------------- */
export function showGameDetails(array) {
  const titlePage = document.getElementById("title");
  titlePage.innerText = array.title;

  /* ------------------------- Thumb+title+description ------------------------ */
  const descWrapper = createNode("div", {
    class: "flex",
  });
  const thumb = createNode("img", {
    src: array.thumbnail,
    alt: array.title,
    title: array.title,
  });
  const descDiv = createNode("div", {
    class: "flex column",
  });
  const title = createNode("h1", {});
  title.innerText = array.title;

  const descText = createNode("p", {});
  descText.innerText = array.description;

  descDiv.append(title, descText);
  descWrapper.append(thumb, descDiv);
  /* ------------------------------ Screenshots; ------------------------------ */
  let screenshots = "";
  if (array.screenshots.length > 0) {
    screenshots = createNode("div", {
      class: "flex screenshots",
    });
    //width of screenshots
    const width = 100 / array.screenshots.length;

    array.screenshots.forEach((element) => {
      const img = createNode("img", {
        src: element.image,
        style: "width:20vw",
      });
      screenshots.appendChild(img);
    });
  }
  /* ------------------------- Additional Information ------------------------- */
  const addInfoWrapper = createNode("div", {
    class: "flex, column",
  });
  const addInfoTitle = createNode("h2", {
    class: "text-center",
  });
  addInfoTitle.innerText = "Additional Information";
  const addInfoDiv = createNode("div", {
    class: "flex",
  });
  const divLeft = createNode("div", {
    class: "flex column",
  });
  // -------------------------------- Platform
  const platformDiv = createNode("div", {});
  const platformTitle = createNode("h3", {});
  platformTitle.innerHTML = "Platform: <br>";
  platformDiv.appendChild(platformTitle);
  platformDiv.innerHTML += array.platform;
  // -------------------------------- Genre
  const genreDiv = createNode("div", {});
  const genreTitle = createNode("h3", {});
  genreTitle.innerHTML = "Genre: <br>";
  genreDiv.appendChild(genreTitle);
  genreDiv.innerHTML += array.genre;

  divLeft.append(platformDiv, genreDiv);

  const divRight = createNode("div", {
    class: "flex column",
  });
  // -------------------------------- Publisher
  const publisherDiv = createNode("div", {});
  const publisherTitle = createNode("h3", {});
  publisherTitle.innerHTML = "Publisher: <br>";
  publisherDiv.appendChild(publisherTitle);
  publisherDiv.innerHTML += array.publisher;
  // -------------------------------- Release date
  //TODO change date format
  const dateDiv = createNode("div", {});
  const dateTitle = createNode("h3", {});
  dateTitle.innerHTML = "Release Date: <br>";
  dateDiv.appendChild(dateTitle);
  dateDiv.innerHTML += array.release_date;

  divRight.append(publisherDiv, dateDiv);
  addInfoDiv.append(divLeft, divRight);

  addInfoWrapper.append(addInfoTitle, addInfoDiv);

  /* ---------------------------- Link To The Game ---------------------------- */
  const link = createNode("a", {
    href: array.game_url,
    target: "_blank",
    role: "button",
    title: `Let\'s play ${array.title}`,
  });
  link.innerText = `Play ${array.title}`;

  detailsOutput.append(descWrapper, screenshots, addInfoWrapper, link);
}
