<template>
  <div class="navbar flex justify-between items-center h-3">
    <div class="left flex flex-row">
      <div>
        <router-link to="/jackets">Jacket</router-link>
      </div>
      <div>
        <router-link to="/sneakers">Sneakers</router-link>
      </div>
      <div>
        <router-link to="/pants">Pants</router-link>
      </div>
    </div>
    <div class="right flex flex-row items-center">
      <div>
        <router-link  to="/login">Login</router-link>
      </div>
      <div>
        <router-link to="/cart">
          <p>Shopping Cart</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>

</style>