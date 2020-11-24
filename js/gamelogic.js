const _ = require('lodash')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

const game = () => {
    let numberOfPlayers = 0;
    let deck = [];
    let cardIndex = 0;
    let gameData = {};

    // start prompt: ask how many players, 
    // assign deck 
    // assign numberOfPlayers
    readline.question("Hello, welcome to Holdem, how many players do you want to play against?", (answer) => {
        console.log(`So you'll be playing against ${answer} players!`);
        deck = createRandomDeck()
        // console.log("deck", deck) 
        numberOfPlayers = (parseInt(answer) + 1);
        // console.log("numberOfPlayers", numberOfPlayers)
        cardIndex = numberOfPlayers * 2 + 5; 
        // console.log("cardIndex in game", cardIndex)
        console.log("Everyone starts with $100");

        //
        // 
        // testing scope here 
        // gameData = dealCards(numberOfPlayers, deck);

        // console.log(dealCards(numberOfPlayers, deck))    
        readline.question("Shall we play? (y/n) ", (answer) => {
            if(answer === 'y') {
                fullRound(numberOfPlayers, deck, gameData, cardIndex)
            } else if (answer === 'n') {
                console.log("Goodbye!")
            }
        })
        
    });

    // start of round 
    // check for cardIndex to make sure there are still shuffled cards in the deck if not, create new deck 
    // check $ 
    // pass out cards 
    // tell player what they have 
    // ask if player wants to bet pre-flop 
    // show flop 
    // ask if player wants to bet before turn 
    // show turn 
    // ask if player wants to bet before river 
    // show river 

}; 

game()

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

const dealCards = (numberOfPlayers, deck) => {

    // need to seperate logic to make it so that we can take in a cardIndex arg and start from there and not from index 0 
    
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
    // console.log(deck)
    // console.log(initialDeal)
    return initialDeal;
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

const fullRound = (numberOfPlayers, deck, gameData, cardIndex) => {
    // console.log("fullRound Kicked")

    // start of round 
    // check for cardIndex to make sure there are still shuffled cards in the deck if not, create new deck 
    // check $ 

    // pass out cards 
    gameData = dealCards(numberOfPlayers, deck);
    
    // tell player what they have 
    console.log(`You have a ${convertCards(gameData['Player 1']['card 1'])} and a ${convertCards(gameData['Player 1']['card 2'])}`)

    // ask if player wants to bet pre-flop 
    readline.question("Would you like to bet before the flop? (y/n) ", function preFlopBet(answer) {
        if (answer === 'y') {

        } else if (answer === 'n') {

        } else {
            preFlopBet()
        }
    })

    // show flop 
    // ask if player wants to bet before turn 
    // show turn 
    // ask if player wants to bet before river 
    // show river 

}

// {
//     Pool: {
//       'card 1': { number: 12, suit: 2 },
//       'card 2': { number: 13, suit: 1 },
//       'card 3': { number: 9, suit: 3 },
//       'card 4': { number: 11, suit: 4 },
//       'card 5': { number: 12, suit: 1 }
//     },
//     'Player 1': { 'card 1': { number: 8, suit: 1 }, 'card 2': undefined },
//     'Player 2': {
//       'card 1': { number: 6, suit: 3 },
//       'card 2': { number: 3, suit: 1 }
//     },
//     'Player 3': {
//       'card 1': { number: 10, suit: 1 },
//       'card 2': { number: 3, suit: 2 }
//     }
// }