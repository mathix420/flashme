<template>
  <main class="flex flex-col justify-center items-center py-10">
    <h1 class="text-3xl font-black mb-10">FlashMe v1</h1>

    <template v-if="entries.length">
      <nuxt-link v-for="[key, value] in entries" :key="key" :to="`/qr/${key}`"
        class="text-xl m-3 py-5 w-11/12 sm:w-96 bg-gray-100 text-center rounded-full font-bold">
        {{ value.title || 'sheh' }}
      </nuxt-link>
    </template>
    <nuxt-link v-else to="/new" class="bg-blue-500 text-white m-5 px-5 py-2 rounded-xl">
      Add your first QR Code!
    </nuxt-link>

    <footer class="fixed bottom-0 flex justify-center items-center">
      <button class="bg-blue-500 text-white m-5 px-5 py-2 rounded-xl" @click="clear">
        Update QR Code
      </button>
    </footer>
  </main>
</template>

<script>
import { entries } from 'idb-keyval';

export default {
  data() {
    return {
      entries: [],
    }
  },
  mounted() {
    entries()
      .then(entries => (this.entries = entries))
      .catch(e => alert(e))
  },
  methods: {
    clear() {
      localStorage.removeItem('flashme-sorage');
      this.$nuxt.$router.push('/new')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>