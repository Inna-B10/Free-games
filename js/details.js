import { getGamesData } from './main.js'
import { createNode } from './utilities.js'

const detailsOutput = document.getElementById('detailsOutput')

/* ----------------------- Get Details Of Current Game ---------------------- */
if (
	window.location.pathname === '/JS-API-PROJECT/details.html' ||
	window.location.pathname === '/details.html'
) {
	const gameId = window.location.href.split('=')[1]

	const gameDetailsUrl =
		'https://free-to-play-games-database.p.rapidapi.com/api/game?id='.concat(
			gameId
		)
	getGamesData(gameDetailsUrl)
}

/* -------------------- Create HTML Elements (Details Page) ------------------- */
export function showGameDetails(array) {
	// const titlePage = document.getElementById("title");
	// titlePage.innerText = array.title;

	/* ------------------------- Thumb+title+description ------------------------ */
	const descWrapper = createNode('div', {
		class: 'flex',
		id: 'descWrapper'
	})
	const thumb = createNode('img', {
		src: array.thumbnail,
		alt: array.title,
		title: array.title
	})
	thumb.classList.add('mainGameImg')

	const descDiv = createNode('div', {
		class: 'flex column gameinfo'
	})
	const title = createNode('h1', {})
	title.innerText = array.title

	const descText = createNode('p', {})
	descText.innerText = array.description

	descDiv.append(title, descText)
	descWrapper.append(thumb, descDiv)
	/* ------------------------------ Screenshots; ------------------------------ */
	const screenshots = createNode('div', {
		id: 'screenshots',
		class: 'screenshots'
	})

	array.screenshots.forEach((element) => {
		const screenDiv = createNode('div', {
			id: 'screenDiv'
		})
		const img = createNode('img', {
			src: element.image,
			class: 'sliderIMG'
		})
		screenDiv.append(img)
		screenshots.append(screenDiv)
	})

	/* ------------------------------ Arrow-buttons  ------------------------------ */

	// const sliderArrowsContainer = createNode("div", {
	//   id: "sliderArrowsContainer",
	// });

	// const sliderArrowLeft = createNode("img", {
	//   src: "/images/arrowLeft.png",
	// });
	// sliderArrowLeft.classList.add("sliderArrow");
	// const sliderArrowRight = createNode("img", {
	//   src: "/images/arrowRight.png",
	// });
	// sliderArrowRight.classList.add("sliderArrow");

	// sliderArrowsContainer.append(sliderArrowLeft, sliderArrowRight);

	// screenshots.append(sliderArrowsContainer);

	// sliderArrowRight.addEventListener("click", () => {
	//   screenshots.classList.add("scrollRight");
	// });

	/* ------------------------------ Slider settings ------------------------------ */

	// let currentSlideIndex = 0;

	// function showSlide() {
	//   img[currentSlideIndex].classList.add("block");
	// }

	// function hideSlide() {
	//   img[currentSlideIndex].classList.remove("block");
	// }

	// function showNextSlide() {
	//   hideSlide();
	//   currentSlideIndex++;
	//   if (currentSlideIndex > img.length - 1) {
	//     currentSlideIndex = 0;
	//     showSlide();
	//   }
	// }

	// sliderArrowRight.addEventListener("click", showNextSlide());

	/* ------------------------- Additional Information ------------------------- */
	const addInfoWrapper = createNode('div', {
		class: 'flex, column additionalInfoContainer'
	})

	const addInfoTitle = createNode('h2', {
		class: 'text-center'
	})
	addInfoTitle.innerText = 'Additional Information'
	const addInfoDiv = createNode('div', {
		class: 'flex addInfoDiv'
	})

	const addInfoCon = createNode('div', {
		class: 'addInfo'
	})

	const divLeft = createNode('div', {
		class: 'flex column'
	})
	// -------------------------------- Platform
	const platformDiv = createNode('div', {})
	const platformTitle = createNode('h3', {})
	platformTitle.innerHTML = 'Platform: <br>'
	platformDiv.appendChild(platformTitle)
	platformDiv.innerHTML += array.platform
	// -------------------------------- Genre
	const genreDiv = createNode('div', {})
	const genreTitle = createNode('h3', {})
	genreTitle.innerHTML = 'Genre: <br>'
	genreDiv.appendChild(genreTitle)
	genreDiv.innerHTML += array.genre

	divLeft.append(platformDiv, genreDiv)

	const divRight = createNode('div', {
		class: 'flex column'
	})
	// -------------------------------- Publisher
	const publisherDiv = createNode('div', {})
	const publisherTitle = createNode('h3', {})
	publisherTitle.innerHTML = 'Publisher: <br>'
	publisherDiv.appendChild(publisherTitle)
	publisherDiv.innerHTML += array.publisher
	// -------------------------------- Release date
	const dateDiv = createNode('div', {})
	const dateTitle = createNode('h3', {})
	dateTitle.innerHTML = 'Release Date: <br>'
	dateDiv.appendChild(dateTitle)
	dateDiv.innerHTML += array.release_date

	divRight.append(publisherDiv, dateDiv)
	addInfoDiv.append(divLeft, divRight)

	// -------------------------------- Warning info

	const warningInfo = createNode('div', {})
	warningInfo.classList.add('warningInfo')

	// -------------------------------- First warning

	const warningInfoContainer = createNode('div', {
		id: 'warningInfoContainer'
	})
	warningInfoContainer.classList.add('warningInfoContainer')

	const warningIcon = createNode('img', {
		src: './images/info-circle.png',
		alt: 'warning info icon',
		id: 'warningIcon'
	})
	warningIcon.classList.add('warningIcon')

	const warningFirst = createNode('p', {
		class: 'warning'
	})
	warningFirst.innerText =
		'Please note this free-to-play game may or may not offer optional in-game purchases.'

	warningInfoContainer.append(warningIcon, warningFirst)

	// -------------------------------- Second warning

	const warningIconSecond = createNode('img', {
		src: './images/info-circle.png',
		alt: 'warning info icon',
		id: 'warningIconSecond'
	})
	warningIcon.classList.add('warningIcon')

	const warningInfoContainerSecond = createNode('div', {
		id: 'warningInfoContainerSecond'
	})
	warningInfoContainer.classList.add('warningInfoContainer')

	const warningSecond = createNode('p', {
		class: 'warning'
	})
	warningSecond.innerText = `All material on this page is copyrighted by ${array.publisher} and their respective licensors. All other trademarks are the property of their respective owners.`

	warningInfoContainerSecond.append(warningIconSecond, warningSecond)

	// -------------------------------- Third warning

	const warningIconThird = createNode('img', {
		src: './images/info-circle.png',
		alt: 'warning info icon',
		id: 'warningIconThird'
	})
	warningIcon.classList.add('warningIcon')

	const warningInfoContainerThird = createNode('div', {
		id: 'warningInfoContainerSecond'
	})
	warningInfoContainer.classList.add('warningInfoContainer')

	const warningThird = createNode('p', {
		class: 'warning'
	})
	warningThird.innerText = `All material on this page is copyrighted by ${array.publisher} and their respective licensors. All other trademarks are the property of their respective owners.`

	warningInfoContainerThird.append(warningIconThird, warningThird)

	/* ---------------------------- Appending everything in warningInfo ---------------------------- */

	warningInfo.append(
		warningInfoContainer,
		warningInfoContainerSecond,
		warningInfoContainerThird
	)

	/* ---------------------------- Appending all parts to main div ---------------------------- */

	addInfoCon.append(addInfoDiv, warningInfo)
	addInfoWrapper.append(addInfoTitle, addInfoCon)

	/* ---------------------------- Link To The Game ---------------------------- */
	const linkContainer = createNode('div', {
		class: 'linkContainer'
	})
	const link = createNode('a', {
		href: array.game_url,
		target: '_blank',
		role: 'button',
		class: 'pushToGameBtn',
		title: `Let\'s play ${array.title}`
	})
	link.innerText = `Play ${array.title}`
	linkContainer.appendChild(link)

	/* ---------------------------- Go back to all games list ---------------------------- */
	/* ---------------------------- Link To The Game ---------------------------- */
	const backLinkContainer = createNode('div', {
		class: 'linkBackContainer'
	})

	const goBackText = createNode('p', {})
	goBackText.innerText = `You can check the game list again`
	//!FIX link back
	const backLink = createNode('a', {
		href: `/` || `JS-API-PROJECT`,
		// target: "_blank",
		role: 'button',
		class: 'pushBackBtn',
		title: `Go back to the game list`
	})
	backLink.innerText = `Go back to the game list`
	backLinkContainer.append(goBackText, backLink)

	detailsOutput.append(
		descWrapper,
		screenshots,
		addInfoWrapper,
		linkContainer,
		backLinkContainer
	)
}
