<template>
    <div class="card">
        <div v-if="visibility == 'full'" v-bind:class="card.color + 'card'">
            <img v-bind:src="card.image" class="card-img-top">
            <div class="card-body">
                <h1>{{card.name}}</h1>
                <p class="text-justify">{{card.description}}</p>
            </div>
        </div>
        <div v-else>
            <h1>cardback</h1>
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