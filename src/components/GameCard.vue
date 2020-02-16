<template>
    <div v-bind:class="card.color + 'card'">
        <div v-if="visibility == 'full'" >
            <h1>{{card.name}}</h1>
            <img v-bind:src="card.image" alt="no image">
            <p>{{card.description}}</p>
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
div.redcard {
    background-color: red;
}
div.bluecard {
    background-color: blue;
}
p, h1 {
    color: white;
}
</style>