import * as gl from '../../src/gamelogic'

describe('gamelogic', () => {
    it('has a hostage var', () => {
        expect(gl.HOSTAGES_PER_ROUND[0].breakpoint).toEqual(10)
    })
})