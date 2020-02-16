<template>
    <div>
        <GameCard v-bind:card="player.card"></GameCard>
        <GameMessage v-bind:game-state="gameState"></GameMessage>
        <Timer
            v-bind:start-time="startTime"
            v-bind:duration="remainingRounds + 1"
            v-bind:running="timerRunning"
            v-on:time-up="roundEnd"
        ></Timer>
        <button
            @click="startRound"
            type="button"
            class="btn btn-primary"
        >Ready!</button>
        <button
            v-on:click="endRoundEarly"
            type="button"
            class="btn btn-danger"
        >debug</button>
        <button>color reveal</button>
        <button>card reveal</button>
    </div>
</template>

<script>
import {getGame, getPlayer, updateGameState} from "../api_access"
import Timer from "./Timer.vue"
import GameMessage from "./GameMessage.vue"
import GameCard from "./GameCard.vue"
// import {buildDeck} from "../gamelogic"

export default {
    interval: null,

    props: ["accessCode"],

    components: {
        Timer,
        GameMessage,
        GameCard
    },

    data() {
        return {
            startTime: 0,
            currentRound: 1,
            remainingRounds: 2,
            timerRunning: false,
            gameState: "",
            player: {}
        };
    },

    computed: {
        buttonLabel() {
            return this.timerRunning ? "Pause" : "Ready!";
        }
    },

    methods: {
        startRound() {
            this.timerRunning = true
            var self = this;
            var responseData;
            this.gameState = "roundStarted"
            updateGameState("roundStarted", this.accessCode)
                .then(response => {
                    responseData = response.data;
                    self.startTime = response.data.start_time;
                    self.gameState = responseData.state;
                });
        },

        roundEnd() {
            this.remainingRounds--
            this.currentRound++
            if (this.remainingRounds >= 0) {
              updateGameState("betweenRounds", this.accessCode)
                this.gameState = "betweenRounds"
                this.waitForRoundStart()
            }

            else {
                this.gameEnd()
            }
        },

        gameEnd() {
            // change to a new game button rather than the round start button
            this.gameState = "gameOver"
            updateGameState(this.gameState, this.accessCode)
        },

        waitForRoundStart() {
            if (!localStorage.moderator) {
                var self = this
                this.interval = setInterval(() => {
                    getGame(self.accessCode.toUpperCase())
                        .then(response => {
                            if (response.data.state == "roundStarted") {
                                this.timerRunning = true;
                                self.startTime = response.data.start_time;
                                clearInterval(self.interval);
                                self.gameState == response.data.state;
                            }
                        })
                })
            }
        },

        endRoundEarly() {
            this.timerRunning = false
            this.roundEnd()
        }
    },

    created() {
        //TODO add get request for player object by access code and player name
        var self = this;
        this.gameState = "pickingLeader";
        let id = localStorage.getItem("playerID")

        //get the player's object which should now contain a shuffled card index
        getPlayer(id).then(response => {
            self.player = response.data
        })

        this.interval = setInterval(() => {
          getGame(self.accessCode.toUpperCase())
                .then(response => {
                    if (response.data.state == "roundStarted") {
                        this.timerRunning = true;
                        self.startTime = response.data.start_time;
                        clearInterval(self.interval);
                        self.gameState == response.data.state;
                    }
                });
        }, 500);
    }
};
</script>
