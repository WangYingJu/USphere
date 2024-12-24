<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import HotTopicQuickAdd from '@/components/HotTopicQuickAdd.vue'
import HotTopicsList from '@/components/HotTopicsList.vue'
import PopupConfirm from '@/components/PopupConfirm.vue'
import router from '@/router'
import { ref } from 'vue'

function addContentHeight(event) {
  // 重設textarea高度，防止高度不斷累加
  event.target.style.height = 'auto'
  // 設定textarea為自動增長的高度
  event.target.style.height = `${event.target.scrollHeight}px`
}
const showUnsavedPopup = ref(false)
const showErrorPopup = ref(false)
const tempTopicTitle = ref('')
const tempTopicCotent = ref('')
const canPublish = () => tempTopicCotent.value && tempTopicTitle.value

// 點擊'忍痛放棄'
function handleAbandonClick() {
  showUnsavedPopup.value = true
}

// 點擊'發表新話題'
function handlePublishTopic() {
  if (canPublish()) {
    alert('已發佈')
    clearTemp()
    // 跳轉到已發佈的話題詳情頁邏輯（待補上）
  } else {
    showErrorPopup.value = true // 有空白出現錯誤
  }
}

// 點擊'取消'
function handleCancel() {
  showUnsavedPopup.value = false
}

// 點擊showErrorPopup的'確定'
function handleConfirm() {
  showErrorPopup.value = false
}

// 點擊showUnsavedPopup的'確定'
function handleConfirmAbandon() {
  showUnsavedPopup.value = false
  clearTemp()
  setTimeout(() => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }, 300)
}

// 清空輸入框邏輯
function clearTemp() {
  tempTopicTitle.value = ''
  tempTopicCotent.value = ''
}
</script>

<template>
  <PopupConfirm />
  <main class="container container-customizing-1060 flex justify-between gap-5 my-[30px]">
    <div class="w-full">
      <BreadcrumbNav />
      <div
        class="border rounded border-gray-250 bg-white py-[30px] px-10 mb-[30px] flex flex-col justify-between"
      >
        <!-- 發表者資訊 -->
        <div class="flex items-center mb-5">
          <img
            src="../assets/member.png"
            alt="User Avatar"
            class="w-10 h-10 object-cover rounded-full me-2"
          />
          <div>
            <p class="text-sm leading-4 font-medium">王小艾</p>
            <time class="text-xs text-gray-450">10 小時前</time>
          </div>
        </div>
        <!-- 主標 -->
        <h2 class="text-2.5xl leading-11 font-bold mb-2">
          <input
            v-model="tempTopicTitle"
            type="text"
            placeholder="請輸入標題"
            class="w-full placeholder-black outline-none"
          />
        </h2>
        <!-- 內文 -->
        <div class="w-full text-wrap mb-6">
          <textarea
            v-model="tempTopicCotent"
            placeholder="請輸入內容"
            class="w-full h-auto resize-none overflow-y-scroll scrollbar-hide focus:outline-none text-base leading-6.5 text-gray-450 max-h-52"
            rows="5"
            maxlength="100"
            @input="addContentHeight"
          ></textarea>
        </div>
        <!-- 編輯選項 -->
        <div class="mt-auto">
          <div class="flex justify-end items-center gap-10">
            <button type="button" class="text-sm text-gray-550" @click="handleAbandonClick">
              忍痛放棄
            </button>
            <button type="button" class="text-sm text-primary-blue" @click="handlePublishTopic">
              發表新話題
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="right-sidebar">
      <HotTopicQuickAdd />
      <HotTopicsList />
    </div>
    <!-- 彈窗 -->
    <PopupConfirm
      :show="showUnsavedPopup"
      title="尚未發佈"
      message="您的話題尚未發佈，確定要忍痛放棄嗎？"
      :showCancelButton="true"
      CancelButtonName="取消"
      :onCancel="handleCancel"
      :onConfirm="handleConfirmAbandon"
    />
    <!-- 彈窗 -->
    <PopupConfirm
      :show="showErrorPopup"
      title="出現錯誤"
      message="您的話題及內容不得為空白"
      :showCancelButton="false"
      CancelButtonName=""
      :onCancel="handleCancel"
      :onConfirm="handleConfirm"
    />
  </main>
</template>
