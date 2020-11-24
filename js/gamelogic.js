const _ = require('lodash')

const game = (numberOfPlayers) => {
    let deck = createRandomDeck();
    let cardIndex = 0;
    let gameData = dealCards(numberOfPlayers, deck, cardIndex);


    `You have a ${convertCards(gameData['Player 1']['card 1'])} and a ${convertCards(gameData['Player 1']['card 2'])}`

}; 

game(3) 

const createRandomDeck = () => {
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

const dealCards = (numberOfPlayers, deck, cardIndex) => {
    const dealt = {}; 
    let currentDeckIndex = 0;

    for (i = 1; i <= numberOfPlayers; i++) {
        dealt[`Player ${i}`] = {
            "card 1": deck[cardIndex + i - 1],
            "card 2": deck[cardIndex + i - 1 + numberOfPlayers]
        }
    };
    for (i = 1; i <= 5; i++) {
        currentDeckIndex = cardIndex + (numberOfPlayers * 2 + i - 1)
        console.log("currentDeckIndex", currentDeckIndex)
        dealt[`Pool`] = {
            ...dealt['Pool'],
            ['card ' + i]: deck[currentDeckIndex]
        }
    };
    cardIndex = currentDeckIndex + 1; 
    // console.log(deck)
    console.log("dealt", dealt)
    return dealt;
};

const convertCards = (cardObj) => {
    let cardString = '';
    switch (cardObj['number']) {
        case 1: 
            cardString += 'A'
            break;
        case 11: 
            cardString += 'J'
            break;
        case 12: 
            cardString += 'Q'
            break;
        case 13: 
            cardString += 'K'
            break;
        default: 
            cardString += cardObj['number']
    };

    cardString += ' of ';

    switch (cardObj['suit']) {
        case 1: 
            cardString += 'Spades'
            break;
        case 2: 
            cardString += 'Clubs'
            break;
        case 3: 
            cardString += 'Diamonds'
            break;
        case 4: 
            cardString += 'Hearts'
            break;
    };

    return cardString;
};
