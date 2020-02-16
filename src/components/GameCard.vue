<template>
    <div>
        <h1>{{card.name}}</h1>
        <img v-bind:src="card.image" alt="no image">
        <p>{{card.description}}</p>
    </div>
</template>

<script>
export default {
    props: {
        card: Object
    },

    data() {
        return {
            color: "red",
            name: "red team"
        }
    }
}
</script>
