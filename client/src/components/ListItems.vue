<template>
  <div class="w-full min-h-screen py-40 px-20 justify-center">
    <div class="flex flex-col w-full min-h-screen">
      <div class="text-center mb-3">
        <h4 class="text-lg">New Arrivals</h4>
      </div>
      <div class="flex flex-wrap justify-space flex-row w-full h-auto">
        <CardItem v-for="(product, index) in this.$store.state.products" :key="index" :product="product"/>
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from "./CardItem.vue";

export default {
  name: "ListItems",
  components: {
    CardItem
  }
};
</script>

<style>
</style>