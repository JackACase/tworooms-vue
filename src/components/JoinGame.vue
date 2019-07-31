<template>
  <div>
    <form>
      <div class="form-group">
        <label for="playerName">Enter Your Name</label>
        <input
          v-model="name"
          type="text"
          class="form-control"
          id="playerName"
          placeholder="John Smith"
        />
        <label for="accessCode">Enter Game Access Code</label>
        <input
          v-model="accessCode"
          type="text"
          class="form-control"
          id="accessCode"
          placeholder="123ABC"
        />
      </div>
      <button @click="joinGame" type="button" class="btn btn-primary">Join Game</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      accessCode: ""
    };
  },
  methods: {
    joinGame() {
      Storage.setItem("moderator", "false");
      let self = this;
      axios
        .post("http://localhost:8000/join/", {
          player_name: this.name,
          access_code: this.accessCode.toUpperCase()
        })
        .then(response => {
          self.$router.push("/lobby/" + self.accessCode);
        });
    }
  }
};
</script>
