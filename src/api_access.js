import axios from "axios";

var API_BASE = "https://8000-ed3b72c1-001b-4b78-8432-da680fe8be33.ws-us02.gitpod.io/"

export function create_game(playername) {
  let game = {}
  console.log(API_BASE + "game/")
  return axios.post(API_BASE + "game/", { player_name: playername })
}

export function join_game(playername, accesscode) {
  axios.post(API_BASE + "join/", {
    player_name: playername,
    access_code: accesscode.toUpperCase()}).then(
      response => {
        return {
          game: response.data.game,
          player: response.data.player
        }
      }
    )
}
