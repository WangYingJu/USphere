<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import TopicDetailCard from '@/components/TopicDetailCard.vue'
import HotTopicQuickAdd from '@/components/HotTopicQuickAdd.vue'
import HotTopicsList from '@/components/HotTopicsList.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFormDirty } from '@/stores/useFormDirty'

const router = useRouter()
const topicTitle = ref('')

// 接收來自子元件 TopicDetailCard 的資料
const handleTitleUpdate = (newTitle) => {
  topicTitle.value = newTitle
}
const breadcrumbData = computed(() => [
  { name: '首頁', path: '/' },
  { name: topicTitle.value || '載入中...', path: null },
])

const formDirtyStore = useFormDirty()
const canLeavePage = () => {
  if (formDirtyStore.isFormDirty) {
    alert('請完成當前頁面後再離開。')
    return false
  }
  return true
}
// 接收來自子元件 HotTopicQuickAdd 的自定義事件
// 點擊 新增話題按鈕 導航至 新增話題頁面
const handleNavigate = () => {
  if (canLeavePage()) {
    router.push('/add-topic')
  }
}
</script>

<template>
  <main class="container grid grid-cols-4 gap-5 my-[30px]">
    <div class="col-span-3">
      <BreadcrumbNav :breadcrumbs="breadcrumbData" />
      <TopicDetailCard @update-data="handleTitleUpdate" />
    </div>
    <div class="col-span-1">
      <HotTopicQuickAdd @navigate="handleNavigate" />
      <HotTopicsList />
    </div>
  </main>
</template>
