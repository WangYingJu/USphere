import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFormDirty = defineStore('useFormDirty', () => {
  const isFormDirty = ref(false)

  const setFormDirty = (status) => {
    isFormDirty.value = status
  }

  return { isFormDirty, setFormDirty }
})
