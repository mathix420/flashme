<template>
  <main class="flex flex-col justify-center items-center py-10">
    <h1 class="text-3xl font-black mb-10">{{ title }}</h1>

    <canvas ref="code" class="mt-10"></canvas>

    <footer class="fixed bottom-0 flex justify-center items-center">
      <button class="bg-red-700 text-white m-5 px-5 py-2 rounded-xl" @click="deleteQr">
        Delete
      </button>
      <nuxt-link to="/" class="bg-blue-500 text-white m-5 px-5 py-2 rounded-xl">
        Go Home
      </nuxt-link>
    </footer>
  </main>
</template>

<script>
import { get, del } from 'idb-keyval';

export default {
  data() {
    return {
      data: null,
      title: null,
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  async mounted() {
    await get(this.$route.params.id).then(data => {
      this.data = data.data
      this.title = data.title
    }).catch(() => {
      this.$router.push('/')
    })

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
    deleteQr() {
      if (confirm('Are you sure?')) {
        del(this.$route.params.id).then(() => this.$router.push('/'))
      }
    }
  }
}
</script>