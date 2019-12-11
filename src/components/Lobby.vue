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
import {updateGameState, getGame} from "../api_access"
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
          //this will cause the app to transisition to the game screen for all players, and will trigger shuffling
          //on the backend.
            updateGameState("pickingLeader", this.accessCode)
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
        getGame(this.accessCode).then(response => {
            self.players = response.data.players;
            if (response.data.state == "pickingLeader" || response.data.state == "roundStarted") {
                //game has started -> go to game component
                clearInterval(self.interval);
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
