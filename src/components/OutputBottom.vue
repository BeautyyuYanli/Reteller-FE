<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps(['app_status', 'value'])
const full_text = computed(() => props.value.join('\n'))
const display_download = computed(() => props.app_status == 'stopped' && full_text.value.length > 0)
const download_md = () => {
    const element = document.createElement('a')
    const file = new Blob([full_text.value], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'output.md'
    document.body.appendChild(element)
    element.click()
}
</script>
<template>
    <div>
        <span>Status: {{ app_status }}</span>
        <button v-if="display_download" @click="download_md">Download Markdown</button>
    </div>
</template>
<style scoped>
div {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
}

span {
    font-size: large;
}
</style>