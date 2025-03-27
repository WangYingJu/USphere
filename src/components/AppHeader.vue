<script setup>
import { ref, watch } from 'vue'
import { useTopicsStore } from '@/stores/useTopicsStore'
import { useLoginUser } from '@/stores/useLoginUser'
import { useLoginDialog } from '@/stores/useLoginDialog'
import PopupConfirm from '@/components/PopupConfirm.vue'
import { useToast } from 'vue-toastification'
import { fetchLogout } from '@/apis/logout'
import { useLoading } from '@/stores/useLoading'
import { useRouter } from 'vue-router'

const topicsStore = useTopicsStore()
const loginUserStore = useLoginUser()
const loginDialogStore = useLoginDialog()
const toast = useToast()
const loadingStore = useLoading()
const router = useRouter()

// 搜尋按鍵 變更 api 參數
const handleSearch = () => {
  if (topicsStore.keywordString.trim() === '') return

  loadingStore.setLoading(true)
  topicsStore
    .getTopicsData({
      keyword: topicsStore.keywordString.trim(),
      sort: 'null',
      limit: 3,
      page: 1,
    })
    .finally(() => {
      router.push('/')
      loadingStore.setLoading(false)
    })
}
// store.keywordString 值為空字串時執行
const handleChange = (e) => {
  if (e.target.value !== '') return

  handleSearch()
}

// 處理搜尋 bar 的 focus blur 狀態
const isFocus = ref(false)
const handleFocus = () => {
  isFocus.value = true
}
const handleBlur = () => {
  isFocus.value = false
}

// 是否顯示登出彈窗
const showLogoutPopup = ref(false)
// 點擊取消 關閉彈窗
const handleCancelLogout = () => {
  showLogoutPopup.value = false
}
// 點擊確認 執行登出
const handleConfirmLogout = async () => {
  try {
    loadingStore.setLoading(true)
    const res = await fetchLogout()
    localStorage.removeItem('usphere-token')
    loginUserStore.setUserInfo('', '')
    loginUserStore.setIsLogin(false)
    showLogoutPopup.value = false
    toast.success(res.message)
    return res
  } catch (error) {
    console.log(error)
    toast.error('登出失敗')
  } finally {
    loadingStore.setLoading(false)
    handleCancelLogout()
  }
}

// 處理登入登出按鈕
const handleAuthButton = () => {
  if (!loginUserStore.isLogin) {
    loginDialogStore.openDialog()
  } else {
    showLogoutPopup.value = true
  }
}

// 監聽 登入狀態來決定是否更新 can_edit_topics
watch(
  () => loginUserStore.isLogin,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      topicsStore.reFetchTopics()
    }
  },
)
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-250 pt-7 pb-6 sm:py-5"
  >
    <div class="container grid grid-cols-4 gap-6 sm:gap-5 items-center relative">
      <!-- logo -->
      <RouterLink
        to="/"
        class="col-span-4 sm:col-span-1 mx-auto sm:mx-0 flex justify-center items-center w-[103px] h-9"
      >
        <img alt="USphere logo" class="logo w-full h-auto" src="@/assets/USphere.svg" />
      </RouterLink>
      <!-- 搜尋bar -->
      <form
        @submit.prevent
        class="order-last sm:order-none col-span-4 sm:col-span-2 flex justify-between items-center border rounded-full bg-gray-input-bg border-gray-250 py-3 px-5 sm:px-4"
        :class="{ 'outline outline-1 outline-primary-blue border-primary-blue': isFocus }"
      >
        <input
          v-model="topicsStore.keywordString"
          type="search"
          action="/search"
          method="get"
          name="search-bar"
          placeholder="尋找話題？試著輸入......寶可夢！"
          class="text-sm sm:text-base w-full bg-gray-input-bg placeholder-gray-300 focus:outline-none"
          @input="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <button type="button" @click="handleSearch">
          <svg
            class="w-5 sm:w-4 h-auto text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
      <!-- 會員區 -->
      <nav
        class="absolute top-0 right-6 sm:static sm:top-auto sm:right-auto sm:col-span-1 flex flex-row-reverse sm:flex-row justify-start sm:justify-end items-center gap-2"
      >
        <!-- 系統通知 -->
        <RouterLink
          to="/avatar"
          class="bell-icon relative w-10 h-10 hidden sm:flex justify-center items-center"
        >
          <img alt="bellIcon" class="w-6 h-6 block" src="@/assets/bellIcon.svg" />
        </RouterLink>
        <!-- 會員 -->
        <RouterLink to="/avatar" class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-400">
          <img
            :src="loginUserStore.userPic"
            alt="User Avatar"
            class="w-full h-full object-cover rounded-full"
          />
        </RouterLink>
        <!-- 登入登出 icon -->
        <button
          type="button"
          class="w-9 h-9 sm:w-10 sm:h-10 flex justify-center items-center"
          @click="handleAuthButton"
        >
          <img
            v-if="loginUserStore.isLogin"
            src="@/assets/logout.svg"
            alt="登出"
            class="w-5 h-5 sm:w-6 sm:h-6 block"
          />
          <img v-else src="@/assets/login.svg" alt="登入" class="w-6 h-6 block" />
        </button>
      </nav>
    </div>
  </header>
  <!-- 登出彈窗 -->
  <PopupConfirm
    :show="showLogoutPopup"
    title="請確認"
    message="確定要登出嗎？"
    :showCancelButton="true"
    CancelButtonName="取消"
    :onCancel="handleCancelLogout"
    :onConfirm="handleConfirmLogout"
  />
</template>
