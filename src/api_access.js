import axios from "axios";

var API_BASE = "http://localhost:8000/"

function create_game(playername) {
  axios.post(API_BASE + "game/", { player_name: playername }).then(
    response => {
      let game = response.data.game
      let player = response.data.player

      return {
        game: response.data.game,
        player: response.data.player,
        accessCode: response.data.game.access_code
      }
    }
  )
}
