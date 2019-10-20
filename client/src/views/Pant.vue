<template>
  <div>
    <ListItems/>
  </div>
</template>

<script>
import ListItems from '@/components/ListItems'

export default {
  name: 'Pants',
  components: {
    ListItems
  },
  created() {
      this.$store.dispatch('fetchProducts', { itemType: 'Pants' })
  }
}
</script>

<style>

</style>