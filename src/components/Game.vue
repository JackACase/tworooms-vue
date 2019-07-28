<template>
  <h1>it's a game</h1>
</template>

<script>
import axios from "axios";
import moment from "moment"
// import longGameAvailable from "../gamelogic"
export default {
  props: ["accessCode"],

  data() {
      return {
          endTime: 0,
          currentRound: 1,
          remainingRounds: 2
      }
  },

  methods: {
      setTimer(startTime) {
          this.endTime = moment(startTime)
          this.endTime.add(this.remainingRounds + 1, 'minutes')
      }
  },

  created() {
    var self = this
    axios.get(
      "http://localhost:8000/game?access_code=" + self.accessCode.toUpperCase()
    ).then(response => {
        self.endTime = moment(response.data.start_time)
        self.endTime.add(3, 'minutes')
    })
  }
};
</script>
