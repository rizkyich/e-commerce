<template>
  <div class="navbar flex justify-between items-center h-3">
    <div class="left flex flex-row">
      <div>
        <router-link to="/jackets">Jacket</router-link>
      </div>
      <div>
        <router-link to="/sneakers">Sneakers</router-link>
      </div>
      <div>
        <router-link to="/pants">Pants</router-link>
      </div>
    </div>
    <div class="right flex flex-row items-center">
      <div v-if="this.$store.state.role === 'admin'">
        <router-link to="/admin">Admin</router-link>
      </div>
      <div>
        <a
          v-if="this.$store.state.role"
          style="text-decoration: none; color: black;"
          href
          @click.prevent="logout"
        >Logout</a>
        <router-link v-else to="/login">Login</router-link>
      </div>
      <div>
        <router-link to="/cart">
          <p>Shopping Cart</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.commit("CHANGE_ROLE", null);
      this.$router.push("/");
    }
  },
  created() {
    if(localStorage.getItem('token')) {
      this.$store.commit('CHANGE_ROLE', true)
    } else {
      this.$store.commit('CHANGE_ROLE', false)
    }
  }
};
</script>

<style>
</style>