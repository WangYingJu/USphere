<script setup>
import { defineProps, ref, nextTick } from 'vue'
import TopicMenu from './TopicMenu.vue'
import { onClickOutside } from '@vueuse/core'

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
// 點擊外部關閉菜單
const menuRef = ref(null)
onClickOutside(menuRef, async () => {
  await nextTick()
  // closeMenu() 會等 Vue 更新完 DOM 後下一次再執行，才不會影響 toggleMenu()
  closeMenu()
})
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
      ref="menuRef"
      class="absolute end-0 -translate-x-5 w-max popup-container z-50 bg-white border border-gray-250 shadow-lg rounded"
    >
      <TopicMenu :topic="topicData" @close-menu="closeMenu" />
    </div>
  </div>
</template>
