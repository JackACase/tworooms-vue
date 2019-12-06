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
        <label for="accessCode">Enter Game Access Code</label>
        <input
          v-model="accessCode"
          type="text"
          class="form-control"
          id="accessCode"
          placeholder="123ABC"
        />
      </div>
      <button @click="joinGame" type="button" class="btn btn-primary">Join Game</button>
    </form>
  </div>
</template>

<script>
import {join_game} from "../api_access"
export default {
  data() {
    return {
      name: "",
      accessCode: ""
    };
  },
  methods: {
    joinGame() {
      if(localStorage.getItem("moderator")) {
        localStorage.removeItem("moderator")
      }

      let game = join_game(this.name, this.accessCode)

      localStorage.setItem("accessCode", game.game.access_code)
      localStorage.setItem("playerID", game.player.id)

      let self = this;
    }
  }
};
</script>
