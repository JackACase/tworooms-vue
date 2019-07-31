<template>
  <div>
    <h1>Access Code: {{accessCode}}</h1>
    <ul v-if="players">
      <li v-for="player in players">{{player}}</li>
    </ul>

    <button @click="startGame" type="button" class="btn btn-primary" v-if="isModerator">Start!</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      players: ["bob", "joe", "steve"],
      interval: null
    };
  },
  props: ["accessCode"],
  methods: {
      startGame() {
          axios.post('http://localhost:8000/start/', {access_code: this.accessCode, state: "pickingLeader"})
      }
  },
  computed: {
    // only the player who created the game may start the game
    isModerator() {
      return (localStorage.getItem('moderator'))
    }
  },
  created() {
    let self = this;
    this.interval = setInterval(() => {
      // TODO real URLs
      axios
        .get(
          "http://localhost:8000/game?access_code=" +
            self.accessCode.toUpperCase()
        )
        .then(response => {
          self.players = response.data.players;
          if (response.data.state == "pickingLeader" || response.data.state == "roundStarted") {
            //game has started -> go to game component
            clearInterval(self.interval);
            localStorage.removeItem('moderator') // no longer needed once game is started
            this.$router.push("/game/" + self.accessCode);
          }
        });
    }, 500);
  },

  beforeDestroy() {
    clearInterval(this.interval)
  }
};
</script>
