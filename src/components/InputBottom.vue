<script setup>
import { ref } from 'vue'
const emit = defineEmits(['excludes_update'])
const excludes = ref(null)
const exclude_list = ref([])
const add_ex = () => {
  if (excludes.value.value) {
    exclude_list.value.push(excludes.value.value)
    excludes.value.value = ''
    emit('excludes_update', exclude_list.value)
  }
}
</script>
<template>
  <div id="bottom">
    <ul>
      <li v-for="(v, idx) in exclude_list" :key="idx">
        <span> {{ v }}</span>
      </li>
    </ul>
    <div>
      <input ref="excludes" />
      <button @click="add_ex">add</button>
    </div>
  </div>
</template>
<style scoped></style>
