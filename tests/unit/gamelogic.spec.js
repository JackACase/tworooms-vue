import * as gl from '../../src/gamelogic'

describe("Game logic test suite", function() {

    it("can build a deck for an even number of players", function() {
        let deck = gl.buildDeck(6, 'basic')
        expect(deck.length).toBe(6)
    })

    it("can build a deck for an odd number of players", function() {
        let deck = gl.buildDeck(7, 'basic')
        expect(deck.find(card => card.name == "gambler")).toBeDefined()
    })
})