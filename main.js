const url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
const output = document.getElementById("output");

async function getGameData() {
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
      console.log(result);
    } else {
      console.log("Could not fetch data");
      output.innerText = "Something got wrong";
    }
  } catch (error) {
    console.error(error);
    output.innerText = "An error occurred when fetching list of games";
  }
}
getGameData();
