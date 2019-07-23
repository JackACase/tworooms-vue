<template>
  <div>
    <h1>Access Code: {{accessCode}}</h1>
    <ul v-if="players">
      <li v-for="player in players">{{player}}</li>
    </ul>

    <button @click="startGame" type="button" class="btn btn-primary">Start!</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      players: ["bob", "joe", "steve"]
    };
  },
  props: ["accessCode"],
  methods: {
      startGame() {
          axios.post('http://localhost:8000/start/', {access_code: this.accessCode})
      }
  },
  created() {
    var interval;
    let self = this;
    interval = setInterval(() => {
      // TODO real URLs
      axios
        .get(
          "http://localhost:8000/game?access_code=" +
            self.accessCode.toUpperCase()
        )
        .then(response => {
          console.log(response.data);
          self.players = response.data.players;
          if (response.data.state == "gameInProgress") {
            //game has started -> go to game component
            clearInterval(interval);
            this.$router.push("/game/" + self.accessCode);
          }
        });
    }, 5000);
  }
};
</script>
