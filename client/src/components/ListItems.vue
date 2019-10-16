<template>
  <div class="w-full min-h-screen py-40 px-20 justify-center">
    <div class="flex flex-col w-full min-h-screen">
      <div class="text-center mb-3">
        <h4 class="text-lg">New Arrivals</h4>
      </div>
      <div class="flex flex-wrap justify-between flex-row w-full h-auto">
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
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