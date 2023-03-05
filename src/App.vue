<script setup>
import { ref } from 'vue'
import { ws_connect_promise } from './utils.js'
import config from '../config.json'
import OutputBoxs from './components/OutputBoxs.vue'
import InputTop from './components/InputTop.vue'
import InputMid from './components/InputMid.vue'
import InputBottom from './components/InputBottom.vue'
import OutputBottom from './components/OutputBottom.vue'
let send_data = ref({})
let response = ref([])
let status = ref('stopped')
let ws = ref(null)
const send = async () => {
  const data = send_data.value
  if (status.value != 'stopped') {
    return
  } else if (!data.cookies) {
    alert('cookies is empty')
    return
  } else if (!data.text) {
    alert('text is empty')
    return
  } else {
    status.value = 'running'
    // setup websocket
    ws.value = await ws_connect_promise(config.backend_url)
    ws.value.onclose = () => (status.value = 'stopped')
    ws.value.onerror = (e) => {
      console.log(e), (status.value = 'stopped')
    }
    ws.value.onmessage = (e) => {
      const m = JSON.parse(e.data)
      if (m.type == 'data') {
        response.value[response.value.length - 1] = m.data
      } else {
        response.value.push('')
      }
    }
    response.value = ['']
    ws.value.send(JSON.stringify(data))
  }
}
const cancel = () => {
  if (ws.value) {
    ws.value.close()
  }
}
</script>
<template>
  <header>
    <InputTop id="top" :status="status" @send="send" @cancel="cancel"
      @cookies_update="(cookies) => (send_data.cookies = cookies)" />
    <InputMid id="mid" @text_update="(text) => (send_data.text = text)" />
    <InputBottom id="bottom" @excludes_update="(excludes) => (send_data.excludes = excludes)" />
  </header>

  <main>
    <OutputBoxs :value="response" />
    <OutputBottom :app_status="status" :value="response" />
  </main>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 50%;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10%;
}

main {
  top: 0;
  left: 50%;
  width: 50%;
  display: flex;
  flex-direction: column;
}
</style>
