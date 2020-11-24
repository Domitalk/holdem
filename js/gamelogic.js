const _ = require('lodash')

// export default gamelogic = {
//     game,
// }

function game(numberOfPlayers) {
    const gameData = {}; 
    const deck = createRandomDeck()
    // console.log("deck", deck) 

    
    
}; 
game()

function createRandomDeck() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    // make helper to convert numbers to faces
    const suitNumbers = [1, 2, 3, 4]
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
    })
    // console.log("newDeck", newDeck)
    return _.shuffle(newDeck)
};
// createRandomDeck()

function dealCards(numberOfPlayers, deck) {
    const initialDeal = {}
}

function convertNumbers() {};

function convertSuits() {};