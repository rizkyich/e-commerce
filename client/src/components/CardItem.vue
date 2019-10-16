<template>
  <div class="flex flex-col w-1/5 card m-5 shadow-lg">
    <div class="img">
      <img src="@/assets/sepatu1.webp" class="w-full h-64" />
    </div>
    <div class="card-text">
      <p>Asics Gel Lyte 3</p>
      <p>lsdnlsndls</p>
      <p>kjsbdsd</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItem"
};
</script>

<style scoped>
img {
  object-fit: contain;
}

.card-text {
  height: 250px;
}
</style>