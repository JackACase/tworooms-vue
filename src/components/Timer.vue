<template>
  <h1 v-if="startTime != 0">{{timeRemaining}}</h1>
</template>

<script>
import Timer from "easytimer.js";

var started = false

export default {
  data() {
    return {
      timeRemaining: ""
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
        self.timeRemaining = timer.getTimeValues().toString();
      });
      started = true
    }
  }
};
</script>

