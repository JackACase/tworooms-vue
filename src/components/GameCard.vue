<template>
    <div id="game-card" v-bind:class="visibility != 'none' ? card.color + 'card' : 'cardback'">
        <div id="game-card-content" v-if="visibility == 'full'">
            <img id="game-card-image" v-bind:src="card.image">
            <div id="game-card-text">
                <h1 id="game-card-name">{{card.name}}</h1>
                <p id="game-card-description">{{card.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        card: Object,
        visibility: String //none, color, full
    },

    data() {
        return {
            color: "red",
            name: "red team"
        }
    }
}
</script>

<style scoped>
p,
h1 {
  color: white;
}

#game-card {
  border: solid black;
  border-radius: 10px;
  width: 100%;
  height: 60vh;
}

#game-card-content {
  height: 100%;
}

#game-card-image {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
  height: 50%;
}

#game-card-text {
  display: flex;
  flex-direction: column;
  height: 50%;
}

#game-card-name {
  box-sizing: border-box;
  text-align: center;
	flex: 1;
	padding-top: .1em;
	padding-bottom: .1em;
}

#game-card-description {
  box-sizing: border-box;
  text-align: justify;
  overflow: scroll;
  margin: 0;
  padding-bottom: 1em;
	padding-left: 1em;
	padding-right: 1em;
	flex: 4;
}

.redcard {
	background-color: #6e2a2a;
}
.bluecard {
	background-color: #4f65c9;
}
.cardback {
	background-color: white;
}
</style>