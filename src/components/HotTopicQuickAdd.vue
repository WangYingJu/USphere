<script setup>
import { defineEmits, ref } from 'vue'
import { useLoginDialog } from '@/stores/useLoginDialog'
import { useLoginUser } from '@/stores/useLoginUser'
import { useToast } from 'vue-toastification'

const loginUserStore = useLoginUser()
const loginDialogStore = useLoginDialog()
const toast = useToast()
const isClickAddTopic = ref(false)

// 自定義事件
const emit = defineEmits(['navigate'])
function handleAbandonClick() {
  isClickAddTopic.value = true
  if (loginUserStore.isLogin) {
    emit('navigate')
  } else {
    toast.warning('請先登入')
    loginDialogStore.openDialog()
  }
  isClickAddTopic.value = false
}
</script>

<template>
  <div class="border rounded border-gray-250 bg-white p-5 mb-8">
    <h2 class="text-lg font-extrabold leading-6 mb-4">USphere<br />這是屬於我們的圈子</h2>
    <p class="text-base leading-6 text-gray-350 mb-4">快來發起新話題，加入我們的圈子吧！</p>
    <button
      type="button"
      @click="handleAbandonClick"
      class="text-base leading-5 border rounded border-primary-blue bg-white hover:bg-primary-blue text-primary-blue hover:text-white w-full py-2.5 mb-4"
      :class="{
        'disabled:bg-gray-400 disabled:border-gray-400 disabled:hover:none disabled:text-white':
          isClickAddTopic,
      }"
      :disabled="isClickAddTopic"
    >
      發表新話題
    </button>
    <p class="text-base leading-5 text-center text-gray-350">喔 Yeah！</p>
  </div>
</template>
