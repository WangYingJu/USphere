<script setup>
import { watch } from 'vue'
const props = defineProps({
  title: String, // 彈窗主標
  message: String, // 彈窗內文
  show: Boolean, // 控制彈窗是否顯示
  showCancelButton: Boolean, // 是否顯示”取消“按鍵
  CancelButtonName: String, // 按鍵要顯示的名稱
  onCancel: Function, // 點擊“取消”按鈕時的回調
  onConfirm: Function, // 點擊“確定”按鈕時的回調
})
// 阻止背景滾動
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      document.body.classList.add('overflow-hidden') // 禁止滾動
    } else {
      document.body.classList.remove('overflow-hidden') // 恢復滾動
    }
  },
)
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-99"
    >
      <main
        class="bg-white rounded border-gray-250 sm:w-[512px] sm:min-h-60 p-6 flex flex-col"
        @click.stop
      >
        <h3 class="text-xl mb-8">{{ title }}</h3>
        <p class="text-base">{{ message }}</p>
        <div class="mt-auto">
          <div class="flex justify-end gap-10">
            <button v-if="showCancelButton" type="button" class="text-gray-550" @click="onCancel">{{ CancelButtonName }}</button>
            <button type="button" class="text-primary-blue" @click="onConfirm">確定</button>
          </div>
        </div>
      </main>
    </div>
  </Teleport>
</template>

<style>
.overflow-hidden {
  overflow: hidden;
}
</style>
