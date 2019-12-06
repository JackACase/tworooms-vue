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
      name: ""
    };
  },
  methods: {
    createGame() {
      let router = this.$router
      localStorage.setItem("moderator", "true");
      create_game(this.name).then(response => {
        let accessCode = response.data.game.access_code
        localStorage.setItem("accessCode", response.data.game.access_code)
        localStorage.setItem("playerID", response.data.player.id)
        router.push("/lobby/" + accessCode)
      })
    }
  }
};
</script>
