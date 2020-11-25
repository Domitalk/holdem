const _ = require('lodash')

const game = (numberOfPlayers) => {
    let deck = createRandomDeck();
    let cardIndex = 0;
    let gameData = dealCards(numberOfPlayers, deck, cardIndex);

    console.log(`You have a ${convertCards(gameData['Player 1']['card 1'])} and a ${convertCards(gameData['Player 1']['card 2'])}`)
    
    checkForMatching(gameData['Pool'], gameData['Player 1'])

}; 

const createRandomDeck = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const suitNumbers = [1, 2, 3, 4];
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
        // console.log("currentDeckIndex", currentDeckIndex)
        dealt[`Pool`] = {
            ...dealt['Pool'],
            ['card ' + i]: deck[currentDeckIndex]
        }
    };

    cardIndex = currentDeckIndex + 1; 
    // console.log("dealt", dealt)
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

const checkForMatching = (pool, player) => {
    let returnString = 'You have ';
    // the pool can have matches too, so make a comparison obj
    const numberCountObj = {};
    // check for matches 
    for (i = 1; i <= 5; i++) {
        let theNumberValue = pool[`card ${i}`]['number']
        if (numberCountObj[theNumberValue]) {
            numberCountObj[theNumberValue] += 1;
            // console.log('if the number exists in the obj')
        } else {
            numberCountObj[theNumberValue] = 1;
            // console.log('if number doesnt exist')
        }   
    }
    // console.log("the pool's number object", numberCountObj)
    
    // split b/c player can have matches too, 
    // better to check here rather than adding to comparison obj because player would want to know just how the hand affects pool and not the pool's highest hand 
    if (player['card 1']['number'] == player['card 2']['number']) {
        Object.keys(numberCountObj).forEach((num) => {
            if (player['card 1']['number'] == num) {
                returnString += `${numberCountObj[num] + 2} ${num}s `
            }
        })
    } else {
        Object.keys(numberCountObj).forEach((num) => {
            if (player['card 1']['number'] == num) {
                returnString += `${numberCountObj[num] + 1} ${num}s `
            }
            if (player['card 2']['number'] == num) {
                returnString += `${numberCountObj[num] + 1} ${num}s `
            }
        })
    }

    if (returnString.length < 10) {
        returnString += 'nothing that matches the pool in your hand '
    }

    console.log(returnString.slice(0, -1) + '.');
}; 



game(3) 
