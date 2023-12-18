/*
// Array of emojis
const emojis = ["😃", "😃", "😢", "😢", "😎", "😎", "😈", "😈", "😍", "😍", "😤", "😤", "😱", "😱", "😵", "😵"];

// Shuffle the emojis
const shuffledEmojis = emojis.sort(() => Math.random() - 0.5);

// Array to store opened cards
let openedCards = [];

// Loop to create and initialize each card element
for (let i = 0; i < emojis.length; i++) {
    
    // Create a new card element
    let box = document.createElement("div");
    // Set the class name for stylin
    box.className = 'item';
    // Set the inner HTML of the card with a shuffled emoji
    box.innerHTML = shuffledEmojis[i];

    // Add a click event listener to each card
    box.onclick = function () {
        if (this.classList.contains('boxOpen') || openedCards.length >= 2) {
            return;
        }
        // Add the 'boxOpen' class to the clicked card
        this.classList.add('boxOpen');

        // Add the clicked card to the array of opened cards
        openedCards.push(this);

        // Check if two cards are opened
        if (openedCards.length === 2) {

            // Set a timeout to delay checking the cards
            setTimeout(() => {
                
                // Destructure the opened cards
                const [card1, card2] = openedCards;

                // Check if the emojis on the opened cards match
                if (card1.innerHTML === card2.innerHTML) {
                    // Add 'boxMatch' class to matching cards          
                    card1.classList.add('boxMatch');
                    card2.classList.add('boxMatch');

                    // Check if all cards are matched
                    if (document.querySelectorAll('.boxMatch').length == emojis.length) {
                        // Display a win alert
                        alert("Win");
                    }
                } else {
                    // If the emojis do not match, remove 'boxOpen' class to close the cards
                    card1.classList.remove('boxOpen');
                    card2.classList.remove('boxOpen');
                }
                // clear the array of opened cards
                openedCards = [];
            }, 500);
        }
    };

    // Append the card to the game container
    document.querySelector('.game').appendChild(box);
}
*/

/************* Version oop  *********** */
// Define a class for the Memory Game
class MemoryGame {
    // Constructor to initialize the game with emojis and the game container selector
    constructor(emojis, containerSelector) {
        // Step 1: Initialize class properties
        this.emojis = emojis;
        this.shuffledEmojis = this.shuffleEmojis();
        this.openedCards = [];
        this.container = document.querySelector(containerSelector);

        // Step 2: Create and set up the game
        this.createGame();
    }

    // Method to shuffle the emojis
    shuffleEmojis() {
        // Step 3: Create a copy of the original emojis array and sort it using the Fisher-Yates shuffle algorithm
        return this.emojis.slice().sort(() => Math.random() - 0.5);
    }

    // Method to create a card element with a given emoji
    createCard(emoji) {
        // Step 4: Create a new card element
        const card = document.createElement("div");
        // Set the class name for styling
        card.className = 'item';
        // Set the inner HTML of the card with the provided emoji
        card.innerHTML = emoji;

        // Add a click event listener to the card, calling the handleCardClick method
        card.onclick = () => this.handleCardClick(card);

        return card;
    }

    // Method to handle a card click event
    handleCardClick(card) {
        // Step 5: Check if the card is already open or two cards are already opened
        if (card.classList.contains('boxOpen') || this.openedCards.length >= 2) {
            return;
        }

        // Add 'boxOpen' class to the clicked card
        card.classList.add('boxOpen');
        // Add the clicked card to the array of opened cards
        this.openedCards.push(card);

        // Check if two cards are opened and set a timeout to delay checking
        if (this.openedCards.length === 2) {
            setTimeout(() => this.checkMatchingCards(), 500);
        }
    }

    // Method to check if the opened cards match
    checkMatchingCards() {
        // Step 6: Destructure the opened cards
        const [card1, card2] = this.openedCards;

        // Check if the emojis on the opened cards match
        if (card1.innerHTML === card2.innerHTML) {
            // Add 'boxMatch' class to matching cards
            card1.classList.add('boxMatch');
            card2.classList.add('boxMatch');

            // Check if all cards are matched and display a win message
            if (document.querySelectorAll('.boxMatch').length == this.emojis.length) {
                this.displayWinMessage();
            }
        } else {
            // If the emojis do not match, remove 'boxOpen' class to close the cards
            card1.classList.remove('boxOpen');
            card2.classList.remove('boxOpen');
        }

        // Clear the array of opened cards
        this.openedCards = [];
    }

    // Method to display a win message (can be customized for a better user experience)
    displayWinMessage() {
        // Step 7: Display a win message (you can replace this with a more elaborate UI)
        alert("Win");
    }

    // Method to create the initial game setup
    createGame() {
        // Step 8: Loop through the shuffled emojis and create a card for each one
        for (let i = 0; i < this.emojis.length; i++) {
            const emoji = this.shuffledEmojis[i];
            const card = this.createCard(emoji);

            // Append the card to the game container
            this.container.appendChild(card);
        }
    }
}

// Step 9: Usage - Create a new instance of MemoryGame with the provided emojis and game container selector
const emojis = ["😃", "😃", "😢", "😢", "😎", "😎", "😈", "😈", "😍", "😍", "😤", "😤", "😱", "😱", "😵", "😵"];
const game = new MemoryGame(emojis, '.game');
