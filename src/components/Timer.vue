<template>
  <h1>{{minutes}}:{{paddedSeconds}}</h1>
</template>

<script>
import Timer from "easytimer.js";

var started = false;

export default {
  data() {
    return {
      timeRemaining: "",
      minutes: "0",
      seconds: "00"
    };
  },

  computed: {
      paddedSeconds: function() {
          return this.seconds.toString().length > 1 ? this.seconds : "0" + this.seconds
      }
  },

  props: ["startTime", "duration"],

  methods: {},

  watch: {
    startTime() {
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
        self.minutes = timer.getTimeValues().minutes;
        self.seconds = timer.getTimeValues().seconds;
      });
    }
  }
};
</script>

