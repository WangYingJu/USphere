<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import HotTopicQuickAdd from '@/components/HotTopicQuickAdd.vue'
import HotTopicsList from '@/components/HotTopicsList.vue'
import PopupConfirm from '@/components/PopupConfirm.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { createTopic } from '@/apis/postTopic'
import { updateTopic } from '@/apis/patchTopic'
import { useFormDirty } from '@/stores/useFormDirty'
import { useToast } from 'vue-toastification'
import { useTopicsStore } from '@/stores/useTopicsStore'
import { useLoginUser } from '@/stores/useLoginUser'
import { useLoginDialog } from '@/stores/useLoginDialog'

const toast = useToast()
const route = useRoute()
const router = useRouter()
const store = useTopicsStore()
const loginUserStore = useLoginUser()
const loginDialogStore = useLoginDialog()

function addContentHeight(event) {
  // 重設textarea高度，防止高度不斷累加
  event.target.style.height = 'auto'
  // 設定textarea為自動增長的高度
  event.target.style.height = `${event.target.scrollHeight}px`
}
const showUnsavedPopup = ref(false)
const showUnsavedEditPopup = ref(false)
const tempTopicTitle = ref('')
const tempTopicContent = ref('')
const canPublish = () => tempTopicContent.value && tempTopicTitle.value
const isSubmit = ref(false)

// 點擊'忍痛放棄'
function handleAbandonClick() {
  showUnsavedPopup.value = true
}

// 點擊'發表新話題'
function handlePublishTopic() {
  if (canPublish()) {
    isSubmit.value = true
    postTopic({
      title: tempTopicTitle.value,
      content: tempTopicContent.value,
    })
  } else {
    toast.warning('標題及內容不得為空白')
  }
}

// 發布話題邏輯 post
const postTopic = async (params) => {
  try {
    const res = await createTopic(params)
    // 儲存取得的 id
    const topicId = res.id
    // topicId 取得值時前往該詳情頁並儲存到 store
    if (topicId) {
      toast.success('發佈成功')
      clearTemp()
      store.topicsData.unshift(res)
      return router.replace(`/topics/${topicId}`)
    }
  } catch (error) {
    console.log(error)
    if (error.status === 403) {
      toast.warning('請先登入')
      return loginDialogStore.openDialog()
    }
    toast.error('發佈失敗')
  } finally {
    isSubmit.value = false
  }
}

// 點擊'取消'
function handleCancel() {
  showUnsavedPopup.value = false
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

// 點擊 showUnsavedEditPopup的'取消'
function handleCancelEdit() {
  showUnsavedEditPopup.value = false
}

// 點擊 showUnsavedEditPopup的'確定'
function handleConfirmAbandonEdit() {
  const id = route.query.id
  router.replace(`/topics/${id}`)
}

// 點擊 儲存編輯
function handleSaveEdit() {
  if (canPublish()) {
    isSubmit.value = true
    patchTopic(route.query.id, {
      title: tempTopicTitle.value,
      content: tempTopicContent.value,
    })
  } else {
    toast.warning('話題及內容不得為空白')
  }
}

// 更新話題邏輯 patch
const patchTopic = async (id, params) => {
  try {
    await updateTopic(id, params)
    // store 中如果有找到該 id 的話題則更新
    const topic = store.topicsData.find((topic) => topic.id === id)
    if (topic) {
      topic.title = params.title
      topic.content = params.content
    }
    toast.success('儲存成功')
    return router.replace(`/topics/${id}`)
  } catch (error) {
    console.log(error)
    if (error.status === 403) {
      toast.warning('請先登入')
      return loginDialogStore.openDialog()
    }
    toast.error('儲存失敗')
  } finally {
    isSubmit.value = false
  }
}

// 點擊 放棄編輯
function handleUnsavedEdit() {
  showUnsavedEditPopup.value = true
}

// 清空輸入框邏輯
function clearTemp() {
  tempTopicTitle.value = ''
  tempTopicContent.value = ''
}

// 判斷麵包屑名稱
const pageName = computed(() => {
  return route.query.id ? '編輯話題頁' : '新增話題頁'
})

const breadcrumbData = [
  { name: '首頁', path: '/' },
  { name: pageName.value, path: null },
]

onMounted(() => {
  // 如果有 id 則代表是編輯話題頁面
  if (route.query.id) {
    tempTopicTitle.value = route.query.title
    tempTopicContent.value = route.query.content
    router.push({ query: { id: route.query.id } })
  }
})

const formDirtyStore = useFormDirty()
// 接收來自子元件 HotTopicQuickAdd 的自定義事件
// 點擊 新增話題按鈕
const handleNavigate = () => {
  if (formDirtyStore.isFormDirty && route.query.id) {
    alert('請完成當前頁面後再離開。')
  } else {
    alert('已在新增話題頁面。')
  }
}
// 初始渲染時將 isFormDirty 設為 true
onMounted(() => {
  formDirtyStore.setFormDirty(true)
})
// 在頁面離開時將 isFormDirty 設為 false
onUnmounted(() => {
  formDirtyStore.setFormDirty(false)
})
</script>

<template>
  <PopupConfirm />
  <main class="container container-customizing-1060 flex justify-between gap-5 my-[30px]">
    <div class="w-full">
      <BreadcrumbNav :breadcrumbs="breadcrumbData" />
      <div
        class="border rounded border-gray-250 bg-white py-[30px] px-10 mb-[30px] flex flex-col justify-between"
      >
        <!-- 發表者資訊 -->
        <div class="flex items-center mb-5">
          <img
            :src="loginUserStore.userPic"
            alt="User Avatar"
            class="w-10 h-10 object-cover rounded-full me-2"
          />
          <div>
            <p class="text-sm leading-4 font-medium">
              {{ loginUserStore.userName }}
            </p>
            <span class="text-xs text-gray-450">{{
              route.query.id ? '編輯中...' : '正在輸入...'
            }}</span>
          </div>
        </div>
        <!-- 主標 -->
        <div class="mb-2">
          <textarea
            v-model="tempTopicTitle"
            placeholder="請輸入標題"
            class="w-full text-2.5xl leading-11 font-bold placeholder-black outline-none break-words whitespace-pre-wrap resize-none overflow-y-auto"
            rows="1"
            @input="addContentHeight"
          ></textarea>
        </div>
        <!-- 內文 -->
        <div class="w-full text-wrap mb-6">
          <textarea
            v-model="tempTopicContent"
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
            <button
              type="button"
              class="text-sm text-gray-550"
              @click="route.query.id ? handleUnsavedEdit() : handleAbandonClick()"
            >
              {{ route.query.id ? '放棄編輯' : '忍痛放棄' }}
            </button>
            <button
              type="button"
              :disabled="isSubmit"
              class="text-sm text-primary-blue"
              @click="route.query.id ? handleSaveEdit() : handlePublishTopic()"
            >
              {{ route.query.id ? '儲存編輯' : '發表新話題' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="right-sidebar">
      <HotTopicQuickAdd @navigate="handleNavigate" />
      <HotTopicsList />
    </div>
    <!-- 彈窗 -->
    <PopupConfirm
      :show="showUnsavedEditPopup"
      title="尚未儲存"
      message="您的話題尚未儲存，確定要放棄編輯嗎？"
      :showCancelButton="true"
      CancelButtonName="取消"
      :onCancel="handleCancelEdit"
      :onConfirm="handleConfirmAbandonEdit"
    />
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
  </main>
</template>
