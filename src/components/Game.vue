<template>
  <div>
    <Timer v-bind:start-time="startTime" v-bind:duration="remainingRounds + 1"></Timer>
  </div>
</template>

<script>
import axios from "axios";
import Timer from "./Timer.vue";

export default {
  props: ["accessCode"],

  components: {
    Timer
  },

  data() {
    return {
      startTime: 0,
      currentRound: 1,
      remainingRounds: 2
    };
  },

  created() {
    var self = this;
    axios
      .get(
        "http://localhost:8000/game?access_code=" +
          self.accessCode.toUpperCase()
      )
      .then(response => {
        self.startTime = response.data.start_time
      });
  }
};
</script>
