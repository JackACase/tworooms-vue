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
      <button @click="newGame" type="button" class="btn btn-primary">Create Game</button>
    </form>
  </div>
</template>

<script>
import {createGame} from "../api_access"
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    newGame() {
      let router = this.$router
      localStorage.setItem("moderator", "true");
      createGame(this.name).then(response => {
        let accessCode = response.data.game.access_code
        localStorage.setItem("accessCode", response.data.game.access_code)
        localStorage.setItem("playerID", response.data.player.id)
        router.push("/lobby/" + accessCode)
      })
    }
  }
};
</script>
