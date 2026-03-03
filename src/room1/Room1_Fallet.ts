// Enkel kod för Rum 1 (nybörjarnivå)

// Visa landningssidan och göm spelet
export function initRoom1() {
	let landing = document.getElementById("rum1Startsida");
	let content = document.getElementById("rum1Behallare");
	if (landing && content) {
		landing.classList.remove("hidden");
		content.classList.add("hidden");
	}
	let startBtn = document.getElementById("rum1StartKnapp");
	if (startBtn) {
		startBtn.onclick = function () {
			if (landing && content) {
				landing.classList.add("hidden");
				content.classList.remove("hidden");
			}
			attachRoom1Listeners();
			startRoom1GameLogic();
		};
	}
}
window.initRoom1 = initRoom1;

// Sätt event på nycklar och nyckelhål
function attachRoom1Listeners() {
	let keyL = document.getElementById("nyckeln-L");
	let keyE = document.getElementById("nyckeln-E");
	let keyV = document.getElementById("nyckeln-V");
	let keyA = document.getElementById("nyckeln-A");
	let keyhole = document.getElementById("nyckelhalet");
	let message = document.getElementById("falletMeddelande");
	window.selectedKey = null;

	if (keyL)
		keyL.onclick = function () {
			window.selectedKey = "L";
			if (message)
				message.innerHTML = "<p>Du har valt nyckeln med bokstaven L!</p>";
		};
	if (keyE)
		keyE.onclick = function () {
			window.selectedKey = "E";
			if (message)
				message.innerHTML = "<p>Du har valt nyckeln med bokstaven E!</p>";
		};
	if (keyV)
		keyV.onclick = function () {
			window.selectedKey = "V";
			if (message)
				message.innerHTML = "<p>Du har valt nyckeln med bokstaven V!</p>";
		};
	if (keyA)
		keyA.onclick = function () {
			window.selectedKey = "A";
			if (message)
				message.innerHTML = "<p>Du har valt nyckeln med bokstaven A!</p>";
		};

	if (keyhole)
		keyhole.onclick = function () {
			let selectedKey = window.selectedKey;
			if (selectedKey && message) {
				message.innerHTML = `<p>Du har låst upp dörren och samlat på dig bokstaven ${selectedKey}!</p>`;
				let artefaktSpan = document.querySelector("#artefakt1 span");
				if (artefaktSpan) artefaktSpan.textContent = selectedKey;
			} else if (message) {
				message.innerHTML =
					"<p>Du måste välja en nyckel för att låsa upp dörren!</p>";
			}
		};
}

// Enkel scroll och startmeddelande
function startRoom1GameLogic() {
	let scrollContainer = document.querySelector(
		"#rum1 .bakgrundsRullning",
	) as HTMLElement;
	if (scrollContainer) {
		let start = scrollContainer.scrollTop;
		let target = scrollContainer.scrollHeight;
		let duration = 15000;
		let startTime = performance.now();
		function animateScroll(currentTime: number) {
			let elapsed = currentTime - startTime;
			let progress = Math.min(elapsed / duration, 1);
			scrollContainer.scrollTop = start + (target - start) * progress;
			if (progress < 1) {
				requestAnimationFrame(animateScroll);
			}
		}
		requestAnimationFrame(animateScroll);
	}
	let message = document.getElementById("falletMeddelande");
	if (message) {
		message.innerHTML = "<p>Fort! Välj en nyckel innan du landar!</p>";
	}
}
