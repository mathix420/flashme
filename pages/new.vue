<template>
  <main class="flex flex-col justify-center items-center py-10">
    <h1 class="text-3xl font-black mb-10">
      Scan your QR Code!
    </h1>

    <video ref="video" />

    <footer class="fixed bottom-0 flex justify-center items-center">
      <button v-if="isScanning" class="bg-red-500 text-white m-5 px-5 py-2 rounded-xl" @click="stopCamera">
        Stop scanning
      </button>
      <button v-if="!isScanning" class="bg-blue-500 text-white m-5 px-5 py-2 rounded-xl" @click="startCamera">
        Start scanning
      </button>
    </footer>
  </main>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import QrScanner from 'qr-scanner'
import { set } from 'idb-keyval'

QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js'

export default {
  data () {
    return {
      qrScanner: null,
      isScanning: true,
      ok: false
    }
  },
  mounted () {
    this.qrScanner = new QrScanner(this.$refs.video, this.onDecodedhandler)

    QrScanner.hasCamera().then((res) => {
      if (res) {
        this.qrScanner.start()
      } else {
        alert('Your device has no cameras.')
      }
    })
  },
  beforeDestroy () {
    try {
      this.qrScanner.stop()
    } catch {}
    try {
      this.qrScanner.destroy()
    } catch {}
    this.isScanning = false
  },
  methods: {
    stopCamera () {
      this.qrScanner.stop()
      this.isScanning = false
    },
    startCamera () {
      this.qrScanner.start()
      this.isScanning = true
    },
    onDecodedhandler (data) {
      this.stopCamera()
      let title = null
      while (!title) {
        if (title !== null) { alert('Please provide a title!') }
        title = prompt('QR Code title')
      }
      set(uuidv4(), {
        title,
        data
      }).then(() => {
        this.$nuxt.$router.push('/')
      }).catch(alert)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
