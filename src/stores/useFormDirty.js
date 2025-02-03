import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFormDirty = defineStore('useFormDirty', () => {
  const isFormDirty = ref(false)

  const setFormDirty = (state) => {
    isFormDirty.value = state
  }

  return { isFormDirty, setFormDirty }
})
