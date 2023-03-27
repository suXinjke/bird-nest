<template>
  <div>
    <div>count is {{ count }}</div>
    <button v-on:click="this.count++">increase</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      count: 0,
    }
  },
}
</script>
