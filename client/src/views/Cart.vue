<template>
  <div class="flex justify-center mt-20">
    <div style="width:80vw;" class="flex flex-col">
      <div class="flex flex-row justify-between mb-10">
      <h4 class="text-3xl">Your Cart</h4>
      <button @click="removeCart" class="bg-black mr-6 w-3/12 btn-hover text-white font-bold py-2 px-4 focus:outline-none">Checkout</button>
      </div>
      <div class="flex flex-col">
        <div v-for="(cart, index) in this.$store.state.cart" :key="index">
          <div class="flex flex-row" style="height: 15vh; border-bottom:1px solid grey;">
            <img :src="cart.image" class="w-1/4 object-contain px-10" style="height:80%" alt />
            <div
              class="name flex flex-col items-center justify-center"
              style="width:55%; height: 100%; text-overflow: ellipsis;"
            >
              <h1
                class="px-10 text-1xl"
                style="font-size: 1.2rem; font-weight: 700;"
              >{{cart.itemName}}</h1>
              <p>{{cart.description}}</p>
            </div>
            <div class="flex items-center" style="width:20%; height: 100%">
              <h1 class="px-10 text-lg">IDR {{cart.price}}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Cart",
  created() {
    this.$store.dispatch("fetchCart");
  },
  methods: {
    removeCart() {
      axios({
        url: `${this.$store.state.baseUrl}/users/cart`,
        method: "delete",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          Swal.fire({
            type: "success",
            title: "Yay..",
            text: `Enjoy your shoes!!`
          });
          this.$store.dispatch("fetchCart");
          this.$router.push("/");
        })
        .catch(console.log);
    }
  }
};
</script>

<style>
</style>