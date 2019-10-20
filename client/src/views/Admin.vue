<template>
  <div class="w-full flex flex-row myContainer pt-40 mt-3">
    <div class="w-3/12 ml-10 flex m-l flex-col max-w-lg">
    <form >
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >Name</label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            v-model="name"
            type="text"
            placeholder="item's name"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >Description</label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="description"
            type="text"
            placeholder="give description"
          />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-city"
          >Type</label>
          <div class="relative">
            <select
              v-model="type"
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              <option value="Jacket" selected>Jacket</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Pants">Pants</option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >Quantity</label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="qty"
            type="number"
            placeholder="how much?"
          />
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-last-name"
          >Price</label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            v-model="price"
            type="number"
            placeholder="how much?"
          />
        </div>
      </div>
    </form>
    <form action @submit.prevent="publish" enctype="multipart/form-data" class="flex flex-col">
      <input id="gambar" type="file" ref="image" accept="image/*" v-on:change="handleImage" />
      <div class="mt-4 w-full">
      <button v-if="!id" type="submit" class="bg-black w-full btn-hover text-white font-bold py-2 px-4 focus:outline-none"
>Register item</button>
      <button v-else type="submit" class="bg-black w-full btn-hover text-white font-bold py-2 px-4 focus:outline-none">Update item</button>
      </div>
    </form>
  </div>
  <div class="flex flex-col w-4/12" style="height: 70vh;">
    <h1 style="text-align: center; font-size: 1.5rem; padding: 2vh;">Item List</h1>
    <div class="w-full flex flex-col flex-wrap h-full" style="overflow: auto;">
      <div class="w-3/12 h-56"  v-for="(product, index) in this.$store.state.products" :key="index">
        <div
          @click.prevent="itemDetail(product)"
          class="ml-20 mt-20 w-full min-h-full flex flex-col shadow mb-2 box">
          <div>
            <img class="object-contain w-full h-40" :src="product.image" alt />
          </div>
          <div>
            <p class="text-center">{{product.itemName}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="detail mx-10 w-5/12">
      <router-view :product="product" @update="update"></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Admin",
  data: function() {
    return {
      id: "",
      name: "",
      type: "",
      description: "",
      price: 0,
      qty: 0,
      items: [],
      product: null
    };
  },
  methods: {
    update(product) {
      this.id = product._id;
      this.name = product.itemName;
      this.description = product.description;
      this.price = product.price;
      this.qty = product.qty;
      this.type = product.itemType;
    },
    itemDetail(product) {
      this.$router.push(`/admin/${product._id}`);
      this.product = product
    },
    handleImage() {
      this.image = this.$refs.image.files[0];
    },
    publish() {
      Swal.showLoading();

      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("itemName", this.name);
      formData.append("description", this.description);
      formData.append("price", Number(this.price));
      formData.append("qty", Number(this.qty));
      formData.append("itemType", this.type);

      let url;
      let method;
      if (this.id) {
        url = `${this.$store.state.baseUrl}/products/${this.id}`;
        method = "put";
      } else {
        url = `${this.$store.state.baseUrl}/products`;
        method = "post";
      }

      axios({
        method,
        url,
        data: formData,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          Swal.close();
          this.resetForm();
          this.$store.dispatch("fetchAllProducts");
        })
        .catch(console.log);
    },
    resetForm() {
      this.id = "";
      this.name = "";
      this.description = "";
      this.price = "";
      this.qty = "";
      this.type = "";
      document.getElementById("gambar").value = "";
    }
  },
  created() {
    this.$store.dispatch("fetchAllProducts");
  },
  beforeRouteEnter(to, form, next) {
    next(vm => {
      if (vm.$store.state.role === "admin") {
        next()
      } else {
        next("/")
      }
    })
  }
};
</script>

<style>
.myContainer {
  min-height: calc(100vh - 8vh);
}

 .shoes{
        overflow: scroll;
        height: 80vh;
        width: 100%;
    }

 .box:hover{
        cursor: pointer;
    }
</style>