<template>
  <div class="mt-20">
    <div class="image">
      <img class="w-full h-64 object-contain" :src="product.image" alt />
    </div>
    <div>
      <p>Name: {{product.itemName}}</p>
    </div>
    <div>
      <p>Description: {{product.description}}</p>
    </div>
    <div>
      <p>Brand: {{product.itemType}}</p>
    </div>
    <div>
      <p>Price: {{product.price}}</p>
    </div>
    <div>
      <p>Quantity: {{product.qty}}</p>
    </div>
    <div style="position:fixed ; bottom: 2vh; right: 8vw;">
      <a href @click.prevent="update(product)">Update</a>
    </div>
    <div style="position:fixed ; bottom: 2vh; right: 2vw;">
      <a href @click.prevent="remove(product._id)">Delete</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ItemDetail",
  props: ["product"],
  methods: {
    update(product) {
      this.$emit("update", product);
    },
    remove(id) {
      Swal.showLoading();
      axios({
        url: `${this.$store.state.baseUrl}/products/${id}`,
        method: "delete",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$store.dispatch("fetchAllProducts");
          Swal.close();
          this.$router.push("/admin");
        })
        .catch(errorHandler);
    }
  }
};
</script>

<style>
</style>