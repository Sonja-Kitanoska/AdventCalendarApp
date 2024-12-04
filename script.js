const adviceList = [
	"Be kind to everyone you meet today.",
	"Draw a picture of your favorite winter memory.",
	"Help someone without being asked.",
	"Say 'thank you' three times today.",
	"Share something with a friend or sibling.",
	"Clean up your toys after playing.",
	"Hug someone you love.",
	"Try to learn something new today.",
	"Compliment someone´s smile.",
	"Pick up one piece of trash to help the planet.",
	"Say something nice to your teacher.",
	"Do a happy dance!",
	"Write down one thing you are grateful for.",
	"Tell a family member you love them.",
	"Smile at everyone you see today.",
	"Sing your favorite holiday song.",
	"Create a new handshake with a friend.",
	"Spend 5 minutes reading your favorite story.",
	"Help set the table for dinner.",
	"Make a card for someone special.",
	"Count the stars in the sky tonight.",
	"Eat one fruit or vegetable you don’t usually eat.",
	"Make a wish before bedtime.",
	"Give your biggest smile to the mirror.",
];

const colors = ["#8CC0E2", "#c30f16", "#b8870f"];
const today = new Date();
const isDecember = today.getMonth() === 11;
const currentDay = today.getDate();
const calendar = document.querySelector(".calendar");
const container = document.querySelector(".container");
let demoModeActive = false;

const dayOrder = [
	5, 12, 7, 1, 18, 24, 3, 16, 10, 22, 9, 15, 6, 13, 20, 2, 21, 19, 11, 8, 17, 4,
	14, 23,
];

const colorOrder = [
	"#8CC0E2",
	"#c30f16",
	"#b8870f",
	"#c30f16",
	"#8CC0E2",
	"#b8870f",
	"#8CC0E2",
	"#b8870f",
	"#c30f16",
	"#8CC0E2",
	"#c30f16",
	"#b8870f",
	"#8CC0E2",
	"#c30f16",
	"#b8870f",
	"#8CC0E2",
	"#c30f16",
	"#b8870f",
	"#c30f16",
	"#8CC0E2",
	"#b8870f",
	"#c30f16",
	"#8CC0E2",
	"#b8870f",
];

function renderCalendar() {
	calendar.innerHTML = "";

	dayOrder.forEach((dayNumber, i) => {
		const day = document.createElement("div");
		day.classList.add("day");
		day.textContent = dayNumber;
		day.dataset.index = dayNumber - 1;
		day.style.backgroundColor = colorOrder[i];

		if (isDecember) {
			if (dayNumber < currentDay) {
				day.textContent = adviceList[dayNumber - 1];
				day.classList.add("opened");
			} else if (dayNumber === currentDay) {
				day.textContent = dayNumber;
			} else {
				day.classList.add("disabled");
			}
		} else if (demoModeActive) {
			if (dayNumber === 1) {
				day.textContent = dayNumber;
			} else {
				day.classList.add("disabled");
			}
		} else {
			day.classList.add("disabled");
		}

		calendar.appendChild(day);
	});
}

calendar.addEventListener("click", (e) => {
	if (e.target.classList.contains("day")) {
		const audio = document.getElementById("audio-player");

		if (!e.target.classList.contains("disabled")) {
			const index = e.target.dataset.index;
			e.target.textContent = adviceList[index];
			e.target.classList.add("opened");
			e.target.classList.remove("disabled");

			if (audio) audio.play();
		} else {
			const originalText = e.target.textContent;
			e.target.textContent = "Be patient! Wait for the day to come!";
			e.target.classList.add("disabled-message", "shake");

			setTimeout(() => {
				e.target.textContent = originalText;
				e.target.classList.remove("disabled-message", "shake");
			}, 3000);
		}
	}
});

if (!isDecember) {
	document.body.insertAdjacentHTML(
		"beforeend",
		`<div class="message">
          <h1>It is not December yet!</h1>
          <p>The calendar is only available in December. You can try the demo mode instead.</p>
		  <small>Imagine it is December 1.</small>
          <button id="demo-mode">Try Demo</button>
        </div>`
	);

	container.style.display = "none";

	const demoModeButton = document.getElementById("demo-mode");
	demoModeButton.addEventListener("click", () => {
		demoModeActive = true;
		container.style.display = "block";
		renderCalendar();
		const message = document.querySelector(".message");
		message.style.display = "none";
	});
} else {
	renderCalendar();
}
