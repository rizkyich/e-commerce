<template>
  <div>
    <div class="w-full h-screen bg-black">
      <h4>{{product}}</h4>
      <h4>halo</h4>
      <!-- <h4 :text="this.$store.state.productDetail">{{this.$store.state.productDetail}}</h4> -->
    </div>
    <div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "ItemDetail",
  props: ['product'],
  data: function() {
    return{
      name: ''
    };
  },
  computed: {
    getname() {
      console.log(this.$store.state.productDetail.itemName)
      return this.$store.state.productDetail.itemName
    }
  }
};
</script>

<style>
</style>