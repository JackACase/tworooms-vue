<template>
  <h1 v-if="startTime != 0">{{minutes}}:{{seconds}}</h1>
</template>

<script>
import Timer from "easytimer.js";

var started = false

export default {
  data() {
    return {
      timeRemaining: "",
      minutes: "0",
      seconds: "00"
    };
  },

  props: ["startTime", "duration"],

  methods: {},

  beforeUpdate() {
    if (!started) {
      var self = this;
      var timer = new Timer();
      var now = Math.floor(Date.now() / 1000);

      var endTime = this.startTime + this.duration * 60;

      var initialTime = endTime - now;

      console.log(
        "now " +
          now +
          ", start" +
          this.startTime +
          ", end " +
          endTime +
          ", diff" +
          initialTime
      );
      timer.start({ countdown: true, startValues: { seconds: initialTime } });
      timer.addEventListener("secondsUpdated", () => {
        self.timeRemaining = timer.getTimeValues().toString()
        self.minutes = timer.getTimeValues().minutes
        self.seconds = timer.getTimeValues().seconds
      });
      started = true
    }
  }
};
</script>

