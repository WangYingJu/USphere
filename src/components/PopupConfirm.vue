<script setup>
import { watch, toRef, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  title: String, // 彈窗主標
  message: String, // 彈窗內文
  show: Boolean, // 控制彈窗是否顯示
  showCancelButton: Boolean, // 是否顯示”取消“按鍵
  CancelButtonName: String, // 按鍵要顯示的名稱
  onCancel: Function, // 點擊“取消”按鈕時的回調
  onConfirm: Function, // 點擊“確定”按鈕時的回調
})

const showRef = toRef(props, 'show')
// 阻止背景滾動
watch(showRef, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const popupRef = ref(null)
// 點擊外部關閉彈窗
onClickOutside(popupRef, () => {
  props.onCancel()
})
</script>

<template>
  <Teleport to="#app">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50"
    >
      <div class="container sm:grid sm:grid-cols-4 sm:gap-5 p-6 sm:p-0">
        <main
          class="sm:col-start-2 sm:col-span-2 bg-white rounded border-gray-250 min-h-60 p-5 sm:p-6 flex flex-col"
          @click.stop
          ref="popupRef"
        >
          <h3 class="sm:text-xl mb-6 sm:mb-8">{{ title }}</h3>
          <p class="text-sm sm:text-base">{{ message }}</p>
          <div class="mt-auto">
            <div class="flex justify-end gap-5 sm:gap-10">
              <button
                v-if="showCancelButton"
                type="button"
                class="text-gray-550 text-sm sm:text-base"
                @click="onCancel"
              >
                {{ CancelButtonName }}
              </button>
              <button
                type="button"
                class="text-primary-blue text-sm sm:text-base"
                @click="onConfirm"
              >
                確定
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  </Teleport>
</template>
