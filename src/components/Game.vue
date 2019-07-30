<template>
  <div>
    <Timer
      v-bind:start-time="startTime"
      v-bind:duration="remainingRounds + 1"
      v-bind:running="timerRunning"
      v-on:time-up="message = 'Time up!'"
    ></Timer>
    <button @click="startRound" type="button" class="btn btn-primary">Ready!</button>
    <h1>{{message}}</h1>
  </div>
</template>

<script>
import axios from "axios";
import Timer from "./Timer.vue";

export default {
  interval: null,

  props: ["accessCode"],

  components: {
    Timer
  },

  data() {
    return {
      startTime: 0,
      currentRound: 1,
      remainingRounds: 2,
      timerRunning: false,
      message: ""
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
      axios
        .post("http://localhost:8000/start/", {
          access_code: this.accessCode.toUpperCase(),
          state: "roundStarted"
        })
        .then(response => {
          self.startTime = response.data.start_time;
        });
    }
  },

  created() {
    var self = this;
    this.interval = setInterval(() => {
      axios.get(
        "http://localhost:8000/game?access_code=" +
          self.accessCode.toUpperCase()
      ).then(response => {
          if(response.data.state == "roundStarted") {
              this.timerRunning = true
              self.startTime = response.data.start_time
              clearInterval(self.interval)
          }
      })
    }, 500);
  }
};
</script>
