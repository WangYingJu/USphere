import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoginDialog = defineStore("useLoginDialog", () => {
  const isShowDialog = ref(false)
  const openDialog = () => {
    isShowDialog.value = true
  }
  const closeDialog = () => {
    isShowDialog.value = false
  }

  return { isShowDialog, openDialog, closeDialog };
})
