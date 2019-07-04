var HOSTAGES_PER_ROUND = [
    { breakpoint: 10, hostages: [null, null, 1, 1, 1] },
    { breakpoint: 13, hostages: [2, 2, 2, 1, 1] },
    { breakpoint: 17, hostages: [3, 2, 2, 1, 1] },
    { breakpoint: 21, hostages: [4, 3, 2, 1, 1] },
    { breakpoint: Number.MAX_SAFE_INTEGER, hostages: [5, 4, 3, 2, 1] },
]

function longGameAvailable(playerCount) {
    if (playerCount > 10) {
        return true
    } else {
        return false
    }
}

function gameHostages(playerCount) {
    for(var i = 0; i < HOSTAGES_PER_ROUND.length; i++) {
        if(playerCount < HOSTAGES_PER_ROUND[i].breakpoint) {
            return HOSTAGES_PER_ROUND[i]
        }
    }
}

function roundHostages(playerCount, currentRound) {
    var hostages = gameHostages(playerCount)
    return hostages[currentRound]
}

export { longGameAvailable, roundHostages }