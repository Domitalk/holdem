const _ = require('lodash')

function game(numberOfPlayers) {
    const deck = createRandomDeck()
    // console.log("deck", deck) 
    let cardIndex = numberOfPlayers * 2 + 5; 
    // console.log("cardIndex in game", cardIndex)
    const gameData = dealCards(numberOfPlayers, deck);
    // console.log(dealCards(numberOfPlayers, deck))

}; 

game(3)

function createRandomDeck() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    // make helper to convert numbers to faces
    const suitNumbers = [1, 2, 3, 4];
    // make helper to convert suitNumbers to suits 4 as hearts etcetc
    let newDeck = [];
    // i think this is ok because the dataset is fixed and won't scale 

    numbers.forEach((number) => {
        suitNumbers.forEach((suit) => {
            newDeck.push({
                number,
                suit
            })
        })
    });
    // console.log("newDeck", newDeck)
    return _.shuffle(newDeck);
};
// createRandomDeck()

function dealCards(numberOfPlayers, deck) {
    const initialDeal = {
        'Pool': {},
    }; 
    for (i = 1; i <= numberOfPlayers; i++) {
        initialDeal[`Player ${i}`] = {
            "card 1": deck[i - 1],
            "card 2": deck[i - 1 + numberOfPlayers]
        }
    };
    for (i = 1; i <= 5; i++) {
        const currentDeckIndex = numberOfPlayers * 2 + i - 1
        // console.log("currentDeckIndex", currentDeckIndex)
        initialDeal[`Pool`] = {
            ... initialDeal[`Pool`],
            ['card ' + i]: deck[currentDeckIndex]
        }
    };
    return initialDeal;
};

function promptUser() {

}

function convertNumbers() {};

function convertSuits() {};