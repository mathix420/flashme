<template>
  <main class="flex flex-col justify-center items-center py-10">
    <canvas ref="code"></canvas>

    <button class="bg-blue-500 text-white m-5 px-5 py-2 rounded-xl fixed bottom-0" @click="clear">
      Update QR Code
    </button>
  </main>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    }
  },
  mounted() {
    this.data = localStorage.getItem('flashme-sorage');
    if (!this.data) return this.$nuxt.$router.push('/load')

    this.$QrGen.render({
        text: this.data,
        radius: 0.5, // 0.0 to 0.5
        ecLevel: 'L', // L, M, Q, H
        fill: '#000', // foreground color
        background: null, // color or null for transparent
        size: Math.min(window.innerWidth - 50, 512) // in pixels
      }, this.$refs.code);
  },
  methods: {
    clear() {
      localStorage.removeItem('flashme-sorage');
      this.$nuxt.$router.push('/load')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>