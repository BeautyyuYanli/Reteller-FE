<script setup>
import { ref } from 'vue'
import { read_file_promise } from '../utils'
defineProps(['status'])
const emit = defineEmits(['send', 'cancel', 'cookies_update'])
const input_cookies = ref(null)
const read_cookies = async () => {
  if (input_cookies.value && input_cookies.value.files[0]) {
    const cookies_obj = JSON.parse(await read_file_promise(input_cookies.value.files[0]))
    emit('cookies_update', cookies_obj)
  }
}
</script>
<template>
  <div id="top">
    <input type="file" @change="read_cookies" ref="input_cookies" />
    <button @click="$emit('send')" v-if="status == 'stopped'">send</button>
    <button @click="$emit('cancel')" v-if="status == 'running'">cancel</button>
  </div>
</template>
<style scoped>
#top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
