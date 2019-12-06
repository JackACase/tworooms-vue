<template>
  <div>
    <form>
      <div class="form-group">
        <label for="playerName">Enter Your Name</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="playerName"
          placeholder="John Smith"
        />
      </div>
      <button @click="createGame" type="button" class="btn btn-primary">Create Game</button>
    </form>
    <h1 v-if="accessCode">{{accessCode}}</h1>
  </div>
</template>

<script>
import {create_game} from "../api_access"
export default {
  data() {
    return {
      name: "",
      accessCode: ""
    };
  },
  methods: {
    createGame() {
      localStorage.setItem("moderator", "true");
      let game = create_game(this.name)

      this.accessCode = game.accessCode

      localStorage.setItem("accessCode", game.accessCode)
      localStorage.setItem("playerID", game.player.id)

      self.$router.push("/lobby/" + this.accessCode)


      // axios
      //   .post("http://localhost:8000/game/", { player_name: this.name })
      //   .then(response => {
      //     let game = response.data.game
      //     let player = response.data.player
      //     self.accessCode = game.access_code
      //     self.$router.push("/lobby/" + self.accessCode)

      //     localStorage.setItem("accessCode", game.access_code)
      //     localStorage.setItem("playerID", player.id)
      //   });
    }
  }
};
</script>
