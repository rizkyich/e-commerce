<template>
  <div class="login">   
    <form class="px-64 pt-32 pb-8">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" :style="{visibility: errorShow}">
        <span class="block sm:inline">{{error}}</span>
      </div>
      <div class="mb-16">
        <label class="block text-gray-700 text-sm font-bold mb-4" for="email">Email address</label>
        <div>
        <input
          class="rounded w-full h-10 py-2 px-3 text-gray-700 focus:outline-none myBorder"
          v-model="email"
          type="email"
        />

        </div>
      </div>
      <div class="mb-10">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
        <input
          class="rounded w-full h-10 py-2 px-3 text-gray-700 mb-3 focus:outline-none myBorder"
          v-model="password"
          type="password"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          v-if="loading === false"
          @click.prevent="login"
          class="bg-black w-full btn-hover text-white font-bold py-2 px-4 focus:outline-none"
          type="button"
        >Submit</button>
       <button v-else type="submit"  @click.prevent=""><i class="fas fa-spinner fa-pulse"></i></button>
      </div>
        <div v-if="this.$store.state.registerSuccess" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <p>Register successfull!</p>
        </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: function(){
    return {
      email: '',
      password: '',
      error: '',
      errorShow: 'hidden',
      loading: false
    }
  },
  methods :{
    login(){
      console.log('masuk')
      this.loading = true

      axios({
        method: 'post',
        url: `${this.$store.state.baseUrl}/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
      .then(({data}) => {
        localStorage.setItem('token', data.token)
        this.$store.commit('AFTER_LOGIN', null)
        if(data.role === 'admin') {
          this.$store.commit('CHANGE_ROLE', 'admin')
          this.$router.push('/admin')
        } else {
          this.$store.commit('CHANGE_ROLE', 'user')
          this.$router.push('/')
        }
      })
      .catch(err => {
        console.log(err)
        if(err.response) {
          this.error = err.response.data.message
          console.log(this.error)
          console.log('xxx')
        } else if(err.request) {
          this.error = "There's no response from server"
        }
        this.errorShow = 'visible'
      })
      .finally(_ => {
        this.loading = false;
      })
    }
  },
  updated() {
    if(this.$store.state.email) this.email = this.$store.state.email
    if(this.$store.state.password) this.password = this.$store.state.password
  }
};
</script>

<style>
*{
  box-sizing: border-box;
}

.myBorder {
  border: none;
  color:black;
  border-bottom: 1px solid black;
  background: #F1F1F1; 
  opacity: 0.8;
  filter: alpha(opacity=100); 
}

.btn-hover {
  transition: 0.3s;
  border:none;
  border: 1px solid black;
}

.btn-hover:hover {
  background: white;
  color: black;
  cursor: pointer;
  border: 1px solid black;
}
</style>