import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoading = defineStore('useLoading', () => {
  const isLoading = ref(false)

  const setLoading = (status) => {
    isLoading.value = status
  }

  return { isLoading, setLoading }
})
