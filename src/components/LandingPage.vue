<template>
<div>
    <gamecard v-bind:card="card" visibility="full"></gamecard>
    <h1>Landing Page</h1>
    <button @click="newGame" type="button" class="btn btn-primary">New Game</button>
    <button @click="joinGame" type="button" class="btn btn-outline-primary">Join Game</button>
</div>
</template>

<script>
import gamecard from './GameCard.vue'
export default {
  methods: {
    newGame () {
      this.$router.push('/new/')
    },
    joinGame () {
      this.$router.push('/join/')
    }
  },
  components: {
      gamecard
  },
  data: function() {
      return {
          card: {
              name: "president",
              image: "https://picsum.photos/200",
              description: "lorem ipsum dolor sit amet",
              color: "red"
          }
      }
  }
}
</script>


