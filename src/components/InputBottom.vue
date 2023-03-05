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
const del_ex = (idx) => {
  exclude_list.value.splice(idx, 1)
  emit('excludes_update', exclude_list.value)
}
const keydown = (e) => {
  if (e.key === 'Enter') {
    add_ex()
  }
}
</script>
<template>
  <div id="bottom">
    <h3>Exclude Words:</h3>
    <ul>
      <li v-for="(v, idx) in exclude_list" :key="idx" @click="del_ex(idx)">
        <span> {{ v }}</span>
        <svg height="1rem" viewBox="0 -4 24 24">
          <path
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" />
        </svg>
      </li>
    </ul>
    <div id="add">
      <input ref="excludes" @keypress="keydown" />
      <button @click="add_ex">add</button>
    </div>
  </div>
</template>
<style scoped>
#bottom {
  width: 100%;
}

#bottom>ul {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 0.5rem;
}

#bottom>ul>li {
  list-style: none;
  display: inline;
  padding: 0rem 0.5rem;
  margin: 0.25rem 0.25rem;
  border: 1px solid #888;
  border-radius: 9999px;
  cursor: pointer;
  transition: 0.2s;
  white-space: nowrap;
}

#bottom>ul>li:hover {
  background-color: #eee;
}

#bottom>div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

#bottom>div>input {
  width: 100%;
}
</style>
