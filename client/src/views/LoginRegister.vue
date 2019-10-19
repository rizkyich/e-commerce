<template>
  <div class="w-full flex flex-row myContainer pt-12 mt-3 pb-12 px-3">
    <div class="flex flex-row w-1/2 rowContainer">
      <div class="login flex flex-col w-full h-full">
        <p class="text-2xl pl-64 pt-4 h-16 myTitle">Sign In</p>
        <Login />
      </div>
    </div>
    <div class="flex flex-row w-1/2 rowContainer">
      <div class="flex flex-col w-full h-full">
        <p class="text-2xl pl-32 pt-4 h-16 myTitle">Don't have an account?</p>
        <Register/>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

export default {
  name: "loginRegister",
  components: {
    Login,
    Register
  }
};
</script>

<style>
.myContainer {
  min-height: calc(100vh - 8vh);
}

.rowContainer {
  min-height: 100%;
}

.login {
  border-right: 1px solid lightgray;
}

.myTitle {
  border-bottom: 1px solid lightgray;
}
</style>