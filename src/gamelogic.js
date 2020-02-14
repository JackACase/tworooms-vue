export var HOSTAGES_PER_ROUND = [
    { breakpoint: 10, hostages: [null, null, 1, 1, 1] },
    { breakpoint: 13, hostages: [2, 2, 2, 1, 1] },
    { breakpoint: 17, hostages: [3, 2, 2, 1, 1] },
    { breakpoint: 21, hostages: [4, 3, 2, 1, 1] },
    { breakpoint: Number.MAX_SAFE_INTEGER, hostages: [5, 4, 3, 2, 1] },
]

// function longGameAvailable(playerCount) {
//     if (playerCount > 10) {
//         return true
//     } else {
//         return false
//     }
// }

// function gameHostages(playerCount) {
//     for(var i = 0; i < HOSTAGES_PER_ROUND.length; i++) {
//         if(playerCount < HOSTAGES_PER_ROUND[i].breakpoint) {
//             return HOSTAGES_PER_ROUND[i]
//         }
//     }
// }

// function roundHostages(playerCount, currentRound) {
//     var hostages = gameHostages(playerCount)
//     return hostages[currentRound]
// }

/*
 * take a playset and playercount and return an array
 * representing every card in the deck
 */
// function buildDeck(playerCount, playsetName) {
//     let cardConfig = require('./assets/cards.json')
//     let playset = cardConfig.playsets.find(set => set.name == playsetName)
//     let deck = []

//     //put the core cards from the set into the deck
//     //TODO if there are fewer players than core cards don't
//     playset.core.forEach(cardName =>
//         deck.push(cardConfig.cards.find(card => card.name == cardName)))

//     //if there are an odd number of players, put the extra card in the deck
//     if(playerCount % 2 != 0) {
//         let extraCard = cardConfig.cards.find(card => card.name == playset.extra)
//         deck.push(extraCard)
//     }
//     //fill the rest of the player count with red and blue team (equal number)
//     let redTeam = cardConfig.cards.find(card => card.name == 'red team')
//     let blueTeam = cardConfig.cards.find(card => card.name == 'blue team')
//     for(let i = deck.length; i < playerCount; i += 2) {
//         deck.push(redTeam)
//         deck.push(blueTeam)
//     }

//     return deck
// }

// export { longGameAvailable, roundHostages }


// Export node module.
// if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
// {
//     module.exports = buildDeck;
// }
