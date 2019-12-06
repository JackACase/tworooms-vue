import axios from "axios";

const API_BASE = "https://8000-ed3b72c1-001b-4b78-8432-da680fe8be33.ws-us02.gitpod.io/"

/*
 * Creates a new game with the player as the moderator
 * returns a promise which will contain the response
 */
export function createGame(playername) {
  return axios.post(API_BASE + "game/", { player_name: playername })
}

/*
 * Joins an existing game as a player
 */
export function joinGame(playername, accesscode) {
  return axios.post(API_BASE + "join/", {
    player_name: playername,
    access_code: accesscode.toUpperCase()
  })
}

/*
 * Retrieves a game object by the access code
 */
export function getGame(accessCode) {
  return axios.get(API_BASE + "game/", {
    params: {
      access_code: accessCode
    }
  })
}

/*
 * Retrieves a player object by playerID
 */
export function getPlayer(playerID) {
  return axios.get(API_BASE + "player/", {
    params: {
      player_id: playerID
    }
  })
}
