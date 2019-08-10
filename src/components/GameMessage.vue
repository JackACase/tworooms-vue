<template>
    <h1>{{message}}</h1>
</template>

<script>
export default {
    props: ["gameState"],

    data() {
        return {
        }
    },

    computed: {
        message: function() {
            var message
            switch(this.gameState) {
                case "roundStarted":
                    message ="round in progress"
                    break
                case "pickingLeader":
                    message = "select a room leader"
                    break
                case "betweenRounds":
                    message = "prepare for next round"
                    break
                default:
                    message = "default"
            }
            return message
        }
    }
}
</script>

