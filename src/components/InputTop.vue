<script setup>
import { ref } from 'vue'
import { read_file_promise } from '../utils'
defineProps(['status'])
const emit = defineEmits(['send', 'cancel', 'cookies_update'])
const input_cookies = ref(null)
const cookies_filename = ref("Upload Cookies")
const read_cookies = async () => {
  if (input_cookies.value && input_cookies.value.files[0]) {
    const cookies_obj = JSON.parse(await read_file_promise(input_cookies.value.files[0]));
    cookies_filename.value = input_cookies.value.files[0].name;
    emit('cookies_update', cookies_obj);
  }
}
</script>
<template>
  <div id="top">
    <span>
      <button class="choose" onclick="document.getElementById('choose_input').click()">{{ cookies_filename }}</button>
      <input id="choose_input" type="file" style="display: none" @change="read_cookies" ref="input_cookies" />
    </span>
    <button class="action" @click="$emit('send')" v-if="status == 'stopped'">Translate</button>
    <button class="action" @click="$emit('cancel')" v-if="status == 'running'">Cancel</button>
  </div>
</template>
<style scoped>
#top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
</style>
