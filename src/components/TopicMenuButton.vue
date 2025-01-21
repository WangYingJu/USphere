<script setup>
import { defineProps, ref } from 'vue'
import TopicMenu from './TopicMenu.vue'

const { topicData } = defineProps({
  topicData: {
    type: Object,
    required: true,
  },
})

// 控制菜單顯示
const isMenuVisible = ref(false)
// 開關菜單
const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
}
// 關閉菜單
const closeMenu = () => {
  isMenuVisible.value = false
}
</script>

<template>
  <div class="ms-auto relative">
    <!-- menu 按鈕 -->
    <button type="button" class="w-5 h-5" @click.stop.prevent="toggleMenu">
      <img src="../assets/moreIcon.svg" alt="管理" class="w-full h-full" />
    </button>
    <!-- 菜單選項 -->
    <div
      v-if="isMenuVisible"
      class="absolute end-0 -translate-x-5 w-max popup-container z-50 bg-white border border-gray-250 shadow-lg rounded"
    >
      <TopicMenu :topic="topicData" @topic-deleted="closeMenu" />
    </div>
  </div>
</template>
