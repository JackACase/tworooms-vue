import axios from "axios";

const API_BASE = "https://8000-ed3b72c1-001b-4b78-8432-da680fe8be33.ws-us02.gitpod.io/"

export function createGame(playername) {
  return axios.post(API_BASE + "game/", { player_name: playername })
}

export function joinGame(playername, accesscode) {
  return axios.post(API_BASE + "join/", {
    player_name: playername,
    access_code: accesscode.toUpperCase()
  })
}

export function getGame(accessCode) {
  return axios.get(API_BASE + "game/", {
    params: {
      access_code: accessCode
    }
  })
}
