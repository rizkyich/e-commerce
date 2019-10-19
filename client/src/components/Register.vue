<template>
  <div class="register">
    <div>
      <p :style="{visibility: errorShow}">{{error}}</p>
    </div>
    <form class="px-64 pt-32 pb-8">
      <div class="mb-16">
        <label class="block text-gray-700 text-sm font-bold mb-4" for="email">Username*</label>
        <div>
          <input
            v-model="username"
            class="rounded w-full h-10 py-2 px-3 text-gray-700 focus:outline-none myBorder"
            type="text"
          />
        </div>
      </div>
      <div class="mb-16">
        <label class="block text-gray-700 text-sm font-bold mb-4" for="email">Email address*</label>
        <div>
          <input
            v-model="email"
            class="rounded w-full h-10 py-2 px-3 text-gray-700 focus:outline-none myBorder"
            type="email"
          />
        </div>
      </div>
      <div class="mb-10">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password*</label>
        <input
          v-model="password"
          class="rounded w-full h-10 py-2 px-3 text-gray-700 mb-3 focus:outline-none myBorder"
          type="password"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          v-if="loading === false"
          @click.prevent="register"
          class="bg-black w-full btn-hover text-white font-bold py-2 px-4 focus:outline-none"
          type="button"
        >Register</button>
        <button v-else type="submit" @click.prevent>
          <i class="fas fa-spinner fa-pulse"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      username: "",
      email: "",
      password: "",
      loading: false,
      error: "",
      errorShow: "hidden"
    };
  },
  methods: {
    register() {
      console.log('register')
      this.loading = true;
      axios({
        method: "post",
        url: `${this.$store.state.baseUrl}/users/register`,
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          const newData = {
            email: data.email,
            password: this.password,
            success: true
          };
          this.$store.commit("SUCCESS_REGISTER", newData);
          this.username = ''
          this.email = ''
          this.password = ''
        })
        .catch(err => {
          if (err.response) {
            this.error = err.response.data.message;
          } else if (err.request) {
            this.error = "No response from server";
          }
          this.errorShow = "visible";
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style>
</style>