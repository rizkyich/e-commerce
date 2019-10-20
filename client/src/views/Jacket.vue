<template>
  <div>
    <ListItems/>
  </div>
</template>

<script>
import ListItems from '@/components/ListItems'

export default {
  name: 'Jacket',
  components: {
    ListItems
  },
  created() {
      this.$store.dispatch('fetchProducts', { itemType: 'Jacket' })
  }
}
</script>

<style>

</style>