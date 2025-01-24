<script setup>
import { defineEmits } from 'vue'

// 自定義事件
const emit = defineEmits(['navigate'])
function handleAbandonClick() {
  // 自定義事件傳遞給父元件
  emit('navigate')
}
</script>

<template>
  <div class="border rounded border-gray-250 bg-white p-5 mb-8" style="width: 250px">
    <h2 class="text-lg font-extrabold leading-6 mb-4">USphere<br />這是屬於我們的圈子</h2>
    <p class="text-base leading-6 text-gray-350 mb-4">快來發起新話題，加入我們的圈子吧！</p>
    <button
      type="button"
      @click="handleAbandonClick"
      class="text-base leading-5 border rounded border-primary-blue bg-white hover:bg-primary-blue text-primary-blue hover:text-white w-full py-2.5 mb-4"
    >
      發表新話題
    </button>
    <p class="text-base leading-5 text-center text-gray-350">喔 Yeah！</p>
  </div>
</template>
