const read_file_promise = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
    }
    reader.onerror = (e) => {
      reject(e)
    }
    reader.readAsText(file)
  })
}

const ws_connect_promise = (url) => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url)
    ws.onopen = () => {
      console.log('backend connected')
      resolve(ws)
    }
    ws.onerror = (e) => {
      reject(e)
    }
  })
}

export { read_file_promise, ws_connect_promise }
