<template>
  <div>
    <ListItems/>
  </div>
</template>

<script>
import ListItems from '@/components/ListItems'

export default {
  name: 'Sneaker',
  components: {
    ListItems
  },
  created() {
      this.$store.dispatch('fetchProducts', { itemType: 'Sneakers' })
  }
}
</script>

<style>

</style>