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
      <button @click="join" type="button" class="btn btn-primary">Join Game</button>
    </form>
  </div>
</template>

<script>
import {joinGame} from "../api_access"
export default {
  data() {
    return {
      name: "",
      accessCode: ""
    };
  },
  methods: {
    join() {
      if(localStorage.getItem("moderator")) {
        localStorage.removeItem("moderator")
      }

      let router = this.$router

      joinGame(this.name, this.accessCode).then(response => {
        let accessCode = response.data.game.access_code

        localStorage.setItem("accessCode", accessCode)
        localStorage.setItem("playerID", response.player.id)

        router.push("/lobby/" + accessCode)
      })
    }
  }
};
</script>
