<template>
  <div id="app">
    <header>
      <router-link to="/">
        <img id="logo" src="./assets/footrauma.png" alt="footrauma logo" />
      </router-link>
    </header>
    <fixed-header :threshold="30">
      <div id="nav">
        <Navbar />
      </div>
    </fixed-header>
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import FixedHeader from "vue-fixed-header";

export default {
  components: {
    Navbar,
    FixedHeader
  }
};
</script>  

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  padding-top: 25px;
  font-size: 28px;
  width: 100%;
  height: 6vh;
  text-align: center;
}

#logo {
  margin: 0 auto;
}

#nav {
  background: #fff;
  position: fixed;
  width: 100%;
  height: 7vh;
  padding: 2rem 22rem 0 22rem;
  border-bottom: 1px solid #2c3e50;
}

#nav.vue-fixed-header--isFixed {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  padding: 1rem 22rem 0 22rem;
  height: 3rem;
  width: 100vw;
  opacity: 0.8;
  filter: alpha(opacity=90);
}

#nav a {
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  margin: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
