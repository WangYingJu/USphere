<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const isClickApply = ref(false)
const handleApplyRequest = () => {
  isClickApply.value = true
  toast.warning('目前暫停此服務，敬請期待！')
  setTimeout(() => {
    isClickApply.value = false
  }, 1000)
}
</script>

<template>
  <div class="border rounded border-gray-250 bg-white p-5">
    <h2 class="text-lg font-semibold leading-6 mb-4">
      <span class="font-extrabold text-primary-blue">US plus</span><br />獨家功能解鎖影響力
    </h2>
    <p class="text-base leading-6 text-gray-350 mb-4">
      你的話題值得被看見！升級 US plus，享受更高曝光！
    </p>
    <button
      type="button"
      class="text-base leading-5 border rounded border-primary-blue bg-white hover:bg-primary-blue text-primary-blue hover:text-white w-full py-2.5 mb-4"
      :class="{
        'disabled:bg-gray-400 disabled:border-gray-400 disabled:hover:none disabled:text-white':
          isClickApply,
      }"
      :disabled="isClickApply"
      @click="handleApplyRequest"
    >
      立即升級 Plus 會員
    </button>
    <p class="text-base leading-5 text-center text-gray-350">快跟上！</p>
  </div>
</template>
