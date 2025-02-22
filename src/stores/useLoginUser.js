import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginUser = defineStore('useLoginUser', () => {
  const userInfo = ref({})

  return { userInfo }
})
