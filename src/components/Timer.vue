<template>
    <h1>{{minutes}}:{{paddedSeconds}}</h1>
</template>

<script>
import Timer from "easytimer.js";

export default {
    props: ["startTime", "duration", "running"],

    data() {
        return {
            timeRemaining: "",
            minutes: "0",
            seconds: "00",
            timer: null
        };
    },

    computed: {
        paddedSeconds: function () {
            return this.seconds.toString().length > 1
                ? this.seconds
                : "0" + this.seconds;
        }
    },

    watch: {
        startTime() {
            var self = this;

            // if timer is being restarted
            if (this.timer) {
                this.timer.removeEventListener("secondsUpdated")
                this.timer.removeEventListener("targetAchieved")
            }

            this.timer = new Timer();
            var now = Math.floor(Date.now() / 1000);

            var endTime = this.startTime + this.duration * 60;

            var initialTime = endTime - now;

            this.timer.start({ countdown: true, startValues: { seconds: initialTime } });
            this.timer.addEventListener("secondsUpdated", () => {
                self.timeRemaining = this.timer.getTimeValues().toString();
                self.minutes = this.timer.getTimeValues().minutes;
                self.seconds = this.timer.getTimeValues().seconds;
            });
            this.timer.addEventListener("targetAchieved", () => {
                //emit an event
                self.$emit("time-up")
            })
        },

        running() {
            if(!this.running) {
                this.timer.stop()
                this.minutes = 0
                this.seconds = 0
            }
        }
    }
};
</script>

