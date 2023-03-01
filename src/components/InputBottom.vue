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
</script>
<template>
  <div id="bottom">
    <ul>
      <li v-for="(v, idx) in exclude_list" :key="idx">
        <span @click="del_ex(idx)"> {{ v }}</span>
      </li>
    </ul>
    <div>
      <input ref="excludes" />
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
}

#bottom>ul>li {
  list-style: none;
  display: inline;
  padding: 0rem 0.5rem;
  margin: 0.25rem 0.25rem;
  border: 1px solid #888;
  border-radius: 9999px;

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
