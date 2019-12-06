import axios from "axios";

var API_BASE = "http://localhost:8000/"

export function create_game(playername) {
  axios.post(API_BASE + "game/", { player_name: playername }).then(
    response => {
      return {
        game: response.data.game,
        player: response.data.player,
        accessCode: response.data.game.access_code
      }
    }
  )
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
