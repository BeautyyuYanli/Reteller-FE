<script setup>
import { marked } from 'marked'
defineProps(['value'])
</script>
<template>
  <ul>
    <li v-for="(v, idx) in value" :key="idx">
      <div v-html="marked.parse(v)"></div>
    </li>
  </ul>
</template>
<style scoped>
li {
  list-style: none;
  border-bottom: 1px solid #888;
}

ul {
  padding: 0;
}
</style>
