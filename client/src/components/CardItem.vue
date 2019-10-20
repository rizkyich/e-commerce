<template>
  <div class="flex flex-col w-1/5 card mx-10 my-5 shadow-lg">
    <div class="img">
      <img :src="product.image" class="w-full h-64" />
    </div>
    <div class="card-text">
      <h4 class="text-center mb-6">{{product.itemName}}</h4>
      <p class="ml-6 italic">{{product.description}}</p>
      <div class="mt-14 ml-6">
        <p>Type: {{product.itemType}}</p>
        <p class="text-sm mt-4">IDR {{product.price}}</p>
        <div class="flex flex-row justify-between mt-8">
          <p v-if="product.qty">in Stock</p>
          <p v-else style="color: red;">Not available</p>
          <button
            @click.prevent="addToCart(product._id)"
            class="bg-black mr-6 w-6/12 btn-hover text-white font-bold py-2 px-4 focus:outline-none"
            type="button"
          >Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CardItem",
  props: ["product"],
  methods: {
    addToCart(id) {
      if (!localStorage.getItem("token")) {
        Swal.fire({
          type: "info",
          title: "Sorry",
          text: `You need to log in first!`
        });
        this.$router.push("/login");
      } else {
        console.log("masuk");
        axios({
          url: `${this.$store.state.baseUrl}/users/cart/${id}`,
          method: "patch",
          headers: {
            token: localStorage.getItem("token")
          }
        })
          .then(({ data }) => {
            this.$store.dispatch("fetchCart");
            this.$store.commit("SET_TOTAL_CART", 1);
          })
          .catch(console.log);
      }
    }
  }
};
</script>

<style scoped>
img {
  object-fit: contain;
}

.card-text {
  height: 250px;
}

.btn-hover {
  transition: 0.3s;
  border: none;
  border: 1px solid black;
}

.btn-hover:hover {
  background: white;
  color: black;
  cursor: pointer;
  border: 1px solid black;
}
</style>