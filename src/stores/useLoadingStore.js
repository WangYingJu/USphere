import { ref } from 'vue'
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('useLoadingStore', () => {
  const isLoading = ref(false)
  const loadingCount = ref(0)

  const setLoading = (status, count) => {
    isLoading.value = status
    loadingCount.value = count
  }

  return { isLoading, loadingCount, setLoading }
})
