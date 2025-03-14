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
  <header class="justify-center bg-white border-b border-gray-250 py-5">
    <div class="container container-customizing-1060 flex justify-between items-center">
      <!-- logo -->
      <RouterLink to="/">
        <img alt="USphere logo" class="logo" src="@/assets/USphere.svg" width="100" height="auto" />
      </RouterLink>
      <!-- 搜尋bar -->
      <form
        @submit.prevent
        class="container flex justify-between items-center border rounded-full bg-gray-input-bg border-gray-250 py-3 px-4"
        :class="{ 'outline outline-1 outline-primary-blue border-primary-blue': isFocus }"
        style="width: 520px"
      >
        <input
          v-model="topicsStore.keywordString"
          type="search"
          action="/search"
          method="get"
          name="search-bar"
          placeholder="尋找話題？試著輸入......寶可夢！"
          class="w-full bg-gray-input-bg placeholder-gray-300 focus:outline-none"
          @input="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <button type="button" @click="handleSearch">
          <svg
            class="h-auto w-4 text-gray-300"
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
      <nav class="flex items-center gap-2">
        <!-- 系統通知 -->
        <RouterLink
          to="/avatar"
          class="bell-icon relative w-10 h-10 flex justify-center items-center"
        >
          <img alt="bellIcon" class="w-6 h-6 block" src="@/assets/bellIcon.svg" />
        </RouterLink>
        <!-- 會員 -->
        <RouterLink to="/avatar" class="w-10 h-10 rounded-full bg-slate-400">
          <img
            :src="loginUserStore.userPic"
            alt="User Avatar"
            class="w-full h-full object-cover rounded-full"
          />
        </RouterLink>
        <!-- 登入登出 icon -->
        <button type="button" class="w-10 h-10" @click="handleAuthButton">
          <img
            :src="
              loginUserStore.isLogin
                ? '/USphere/src/assets/logout.svg'
                : '/USphere/src/assets/login.svg'
            "
            :alt="loginUserStore.isLogin ? '登出' : '登入'"
            class="w-6 h-6 block"
          />
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
