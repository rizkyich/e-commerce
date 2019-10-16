<template>
  <div class="home">
    <Banner msg="Welcome to Your Vue.js App" />
    <ListItems />
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from "@/components/Banner.vue";
import ListItems from "@/components/ListItems.vue"

export default {
  name: "home",
  components: {
    Banner,
    ListItems
  }
};
</script>

<style scoped>

</style>