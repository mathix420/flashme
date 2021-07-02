<template>
  <main>
    <h1>Load your QR Code!</h1>

    <video ref="video"></video>

    <button @click="stopCamera">STOP</button>
    <button @click="startCamera">START</button>
  </main>
</template>

<script>
import QrScanner from 'qr-scanner'

QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js';

export default {
  data() {
    return {
      qrScanner: null,
      ok: false,
    }
  },
  mounted() {
    this.qrScanner = new QrScanner(this.$refs.video, this.onDecodedhandler);

    QrScanner.hasCamera().then(res => {
      if (res) {
        // this.qrScanner.start();
      } else {
        alert('Your device has no cameras.')
      }
    })
  },
  beforeDestroy() {
    try {
        this.qrScanner.stop();
    } catch {}
    try {
      this.qrScanner.destroy();
    } catch {}
  },
  methods: {
    stopCamera() {
      this.qrScanner.stop();
    },
    startCamera() {
      this.qrScanner.start();
    },
    onDecodedhandler(event) {
      this.stopCamera()
      localStorage.setItem('flashme-sorage', event);
      this.$nuxt.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>