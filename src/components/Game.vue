<template>
    <div>
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
    </div>
</template>

<script>
import axios from "axios";
import Timer from "./Timer.vue";
import GameMessage from "./GameMessage.vue";

export default {
    interval: null,

    props: ["accessCode"],

    components: {
        Timer,
        GameMessage
    },

    data() {
        return {
            startTime: 0,
            currentRound: 1,
            remainingRounds: 2,
            timerRunning: false,
            gameState: ""
        };
    },

    computed: {
        buttonLabel() {
            return this.timerRunning ? "Pause" : "Ready!";
        }
    },

    methods: {
        startRound() {
            var self = this;
            var responseData;
            axios
                .post("http://localhost:8000/gamestate/", {
                    access_code: this.accessCode.toUpperCase(),
                    state: "roundStarted",
                    start_time: Math.floor(Date.now() / 1000)
                })
                .then(response => {
                    responseData = response.data;
                    self.startTime = response.data.start_time;
                    self.gameState = responseData.state;
                });
        },

        roundEnd() {
            this.remainingRounds--
            this.currentRound++
            this.gameState = "betweenRounds"
            var self = this
            axios.post("http://localhost:8000/gamestate/", {
                access_code: this.accessCode.toUpperCase(),
                state: self.gameState,
                current_round: self.currentRound
            })

            this.waitForRoundStart()
        },

        waitForRoundStart() {
            if (!localStorage.moderator) {
                var self = this
                this.interval = setInterval(() => {
                    axios
                        .get(
                            "http://localhost:8000/game?access_code=" +
                            self.accessCode.toUpperCase()
                        )
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
        }
    },

    created() {
        var self = this;
        this.gameState = "pickingLeader";
        this.interval = setInterval(() => {
            axios
                .get(
                    "http://localhost:8000/game?access_code=" +
                    self.accessCode.toUpperCase()
                )
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
