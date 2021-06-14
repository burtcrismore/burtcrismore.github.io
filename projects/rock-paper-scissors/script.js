/* 
=================================================
Game Options
================================================= 
*/
const gameOptions = {
	min: 0,
	max: 2,
	ranNum() {
		return Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
	},
	choices: ['Rock', 'Paper', 'Scissors'],
	score: {
		human: 0,
		computer: 0
	},
	meterBar: {
		human: 100,
		computer: 100
	}
};

/* 
=================================================
Round Steps
================================================= 
*/
const roundSteps = {
	playerChoice: document.querySelector('.player-choice__container'),
	allChoiceBtns: document.querySelectorAll('.player-choice__btn'),
	faStacks: document.querySelectorAll('.fa-stack'),
	meterBarHuman: document.querySelector('.scoreboard__meter-bar--human'),
	meterBarComputer: document.querySelector('.scoreboard__meter-bar--computer'),
	humanRock: document.querySelector('.results__panel--human-rock'),
	humanPaper: document.querySelector('.results__panel--human-paper'),
	humanScissors: document.querySelector('.results__panel--human-scissors'),
	computerRock: document.querySelector('.results__panel--computer-rock'),
	computerPaper: document.querySelector('.results__panel--computer-paper'),
	computerScissors: document.querySelector('.results__panel--computer-scissors'),
	messageWinner: document.querySelector('.results__divider-winner'),
	messageLoser: document.querySelector('.results__divider-loser'),
	messageDraw: document.querySelector('.results__divider-draw'),
	messageMatchWon: document.querySelector('.results__divider-match-won'),
	messageMatchLost: document.querySelector('.results__divider-match-lost'),
	resetMatchBtn: document.querySelector('.player-choice__reset'),
	disableBtn() {
		for (allChoiceBtn of this.allChoiceBtns) {
			if (allChoiceBtn.disabled === false) {
				allChoiceBtn.disabled = true;
				allChoiceBtn.style.pointerEvents = 'none';
			} else if (allChoiceBtn.disabled === true) {
				allChoiceBtn.removeAttribute('style');
				allChoiceBtn.removeAttribute('disabled');
			}
		}
		return this;
	},
	handAnimation() {
		const containsHumanRock = this.humanRock.classList.contains('results__panel--move-hand');
		const containsComputerRock = this.computerRock.classList.contains('results__panel--move-hand');
		if (containsHumanRock || containsComputerRock) {
			this.humanRock.classList.remove('results__panel--move-hand');
			this.computerRock.classList.remove('results__panel--move-hand');
		} else if (!containsHumanRock || containsComputerRock) {
			this.humanRock.classList.add('results__panel--move-hand');
			this.computerRock.classList.add('results__panel--move-hand');
		}
		return this;
	},
	handAnimationEnd(humanChoice, computerChoice) {
		// Added globalThis (or window.) to create global variables since these variables can't be called at runtime because they don't exist yet
		globalThis.handMove = document.querySelector('.results__panel--move-hand');

		globalThis.listenForHandMove = () => {
			this.changeHand(humanChoice, computerChoice);
			this.whoWon(humanChoice, computerChoice);

			globalThis.messageShow = document.querySelector('.results__divider-message--show');
			messageShow.addEventListener('animationend', listenForMessageShow);
		};

		globalThis.listenForMessageShow = () => {
			setTimeout(() => {
				messageShow.classList.remove('results__divider-message--show');
				this.scoring(humanChoice, computerChoice);
			}, 900);
		};

		handMove.addEventListener('animationend', listenForHandMove);

		return this;
	},
	changeHand(humanChoice, computerChoice) {
		if (humanChoice === 'Paper') {
			this.humanRock.classList.add('results__panel--hide');
			this.humanPaper.classList.add('results__panel--show');
		} else if (humanChoice === 'Scissors') {
			this.humanRock.classList.add('results__panel--hide');
			this.humanScissors.classList.add('results__panel--show');
		}

		if (computerChoice === 'Paper') {
			this.computerRock.classList.add('results__panel--hide');
			this.computerPaper.classList.add('results__panel--show');
		} else if (computerChoice === 'Scissors') {
			this.computerRock.classList.add('results__panel--hide');
			this.computerScissors.classList.add('results__panel--show');
		}
	},
	whoWon(humanChoice, computerChoice) {
		if (humanChoice === computerChoice) {
			this.messageDraw.classList.add('results__divider-message--show');
		}
		// Did human pick rock?
		else if (humanChoice === 'Rock') {
			if (computerChoice === 'Scissors') {
				this.messageWinner.classList.add('results__divider-message--show');
				++gameOptions.score.human;
				this.meterBarComputer.style.width = `${(gameOptions.meterBar.computer -= 20)}%`;
			} else {
				this.messageLoser.classList.add('results__divider-message--show');
				++gameOptions.score.computer;
				this.meterBarHuman.style.width = `${(gameOptions.meterBar.human -= 20)}%`;
			}
		}
		// Did human pick paper?
		else if (humanChoice === 'Paper') {
			if (computerChoice === 'Rock') {
				this.messageWinner.classList.add('results__divider-message--show');
				++gameOptions.score.human;
				this.meterBarComputer.style.width = `${(gameOptions.meterBar.computer -= 20)}%`;
			} else {
				this.messageLoser.classList.add('results__divider-message--show');
				++gameOptions.score.computer;
				this.meterBarHuman.style.width = `${(gameOptions.meterBar.human -= 20)}%`;
			}
		}
		// Did human pick scissor?
		else if (humanChoice === 'Scissors') {
			if (computerChoice === 'Paper') {
				this.messageWinner.classList.add('results__divider-message--show');
				++gameOptions.score.human;
				this.meterBarComputer.style.width = `${(gameOptions.meterBar.computer -= 20)}%`;
			} else {
				this.messageLoser.classList.add('results__divider-message--show');
				++gameOptions.score.computer;
				this.meterBarHuman.style.width = `${(gameOptions.meterBar.human -= 20)}%`;
			}
		}
	},
	scoring(humanChoice, computerChoice) {
		if (gameOptions.meterBar.human === 0) {
			this.messageMatchLost.classList.add('results__divider-message--show');
			this.resetMatchBtn.classList.add('player-choice__reset--show');
			this.resetMatch();
		} else if (gameOptions.meterBar.computer === 0) {
			this.messageMatchWon.classList.add('results__divider-message--show');
			this.resetMatchBtn.classList.add('player-choice__reset--show');
			this.resetMatch();
		} else {
			this.resetRound(humanChoice, computerChoice);
		}
	},
	resetRound(humanChoice, computerChoice) {
		// Hands

		// refactor with loop maybe? - next revision
		if (humanChoice === 'Paper') {
			this.humanRock.classList.remove('results__panel--hide');
			this.humanPaper.classList.remove('results__panel--show');
		} else if (humanChoice === 'Scissors') {
			this.humanRock.classList.remove('results__panel--hide');
			this.humanScissors.classList.remove('results__panel--show');
		}

		if (computerChoice === 'Paper') {
			this.computerRock.classList.remove('results__panel--hide');
			this.computerPaper.classList.remove('results__panel--show');
		} else if (computerChoice === 'Scissors') {
			this.computerRock.classList.remove('results__panel--hide');
			this.computerScissors.classList.remove('results__panel--show');
		}
		// Animations
		this.humanRock.classList.remove('results__panel--move-hand');
		this.computerRock.classList.remove('results__panel--move-hand');

		// Disable Buttons
		this.disableBtn();

		// Clear timeouts - next revision
		// clearTimeout();
		// Remove event listeners
		handMove.removeEventListener('animationend', listenForHandMove);
		messageShow.removeEventListener('animationend', listenForMessageShow);
	},
	resetMatch() {
		const reset = () => {
			location.reload();
		};
		this.resetMatchBtn.addEventListener('click', reset);
	}
};
/* 
=================================================
Start Round
================================================= 
*/
const startRound = (event) => {
	const choiceBtn = event.target.closest('.player-choice__btn');
	const computerChoice = gameOptions.choices[gameOptions.ranNum()];
	// Fix uncaught type error dataset of null - next revision
	const humanChoice = choiceBtn.dataset.choice;

	if (choiceBtn) {
		roundSteps.disableBtn().handAnimation().handAnimationEnd(humanChoice, computerChoice);
	}
};
roundSteps.playerChoice.addEventListener('click', startRound);
