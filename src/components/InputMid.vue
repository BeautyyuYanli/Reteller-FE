<script setup>
import { ref } from 'vue'
import { read_file_promise } from '../utils'
const emit = defineEmits(['text_update'])
const input = ref(null)
const input_direct = ref(null)
const extract_input = async () => {
  if (input.value && input.value.files[0]) {
    const input_str = await read_file_promise(input.value.files[0])
    input_direct.value.value = input_str
    emit('text_update', input_direct.value.value)
  }
}
const text_update = () => {
  emit('text_update', input_direct.value.value)
}
</script>
<template>
  <div id="mid">
    <textarea id="text" ref="input_direct" @change="text_update"></textarea>
    <input type="file" ref="input" @change="extract_input" />
  </div>
</template>
<style scoped>
#mid {
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

#mid,
#mid > * {
  width: 100%;
}

#text {
  height: 90%;
  overflow: scroll;
}
</style>
