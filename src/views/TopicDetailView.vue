<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import TopicDetailCard from '@/components/TopicDetailCard.vue'
import HotTopicQuickAdd from '@/components/HotTopicQuickAdd.vue'
import HotTopicsList from '@/components/HotTopicsList.vue'
import { computed, provide, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const topicTitle = ref('')

// 接收來自子元件 TopicDetailCard 的資料
function handleTitleUpdate(newTitle) {
  topicTitle.value = newTitle
}
const breadcrumbData = computed(() => [
  { name: '首頁', path: '/' },
  { name: topicTitle.value || '載入中...', path: null },
])

const isFormDirty = ref(false)
// 提供 isFormDirty 資料給子元件
provide('isFormDirty', isFormDirty)
const checkLeaving = () => {
  if (isFormDirty.value) {
    alert('請完成當前頁面後再離開。')
    return false
  } else {
    return true
  }
}
// 接收來自子元件 HotTopicQuickAdd 的自定義事件
// 點擊 新增話題按鈕 導航至 新增話題頁面
const handleNavigate = () => {
  if (checkLeaving()) {
    router.push('/add-topic')
  }
}
</script>

<template>
  <main class="container container-customizing-1060 flex justify-between gap-5 my-[30px]">
    <div class="w-full">
      <BreadcrumbNav :breadcrumbs="breadcrumbData" />
      <TopicDetailCard @update-data="handleTitleUpdate" />
    </div>
    <div class="right-sidebar">
      <HotTopicQuickAdd @navigate="handleNavigate" />
      <HotTopicsList />
    </div>
  </main>
</template>
