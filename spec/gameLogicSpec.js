let buildDeck = require('../src/gamelogic')

describe("Game logic test suite", function() {

    it("can build a deck for an even number of players", function() {
        let deck = buildDeck(6, 'basic')
        expect(deck.length).toBe(6)
    })

    it("can build a deck for an odd number of players", function() {
        let deck = buildDeck(7, 'basic')
        expect(deck.find(card => card.name == "gambler")).toBeDefined()
    })
})
