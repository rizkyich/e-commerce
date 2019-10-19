import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000',
    products: [],
    role: null,
    cart: [],
    admin: null,
    email: null,
    password: null,
    registerSuccess: null,
    productDetail: null
  },
  mutations: {
    CHANGE_ROLE(state, data) {
      state.role = data
    },
    SET_PRODUCTS(state, data) {
      state.products = data
    },
    SET_CART(state, data) {
      state.cart = data
    },
    SUCCESS_REGISTER(state, data) {
      state.email = data.email
      state.password = data.password
      state.registerSuccess = data.success
    },
    AFTER_LOGIN(state, data) {
      state.registerSuccess = data
    },
    GET_PRODUCT_DETAIL(state, data) {
      state.productDetail = data
      console.log(state.productDetail)
    }
  },
  actions: {
    fetchAllProducts(context, data) {
      axios({
        url: `${this.state.baseUrl}/products`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data)
        })
        .catch(console.log)
    },
    fetchProducts(context, data) {
      axios({
        url: `${this.state.baseUrl}/products/itemType/${data.itemType}`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_PRODUCTS', data)

        })
        .catch(console.log)
    },
    fetchCart(context) {
      axios({
        url: `${this.state.baseUrl}/users/cart`,
        method: 'get',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          context.commit('SET_CART', data)

        })
        .catch(console.log)
    }
  }
})

export default store 
