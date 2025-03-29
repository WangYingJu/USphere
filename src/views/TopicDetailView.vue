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
  <main
    class="container grid grid-cols-1 sm:grid-cols-5 md:grid-cols-4 gap-5 pt-[166px] sm:pt-[121px] sm:pb-[30px]"
  >
    <div
      class="relative w-[calc(100%_+_3rem)] left-[-1.5rem] sm:w-full sm:left-0 sm:col-span-3 md:col-span-3"
    >
      <div class="hidden sm:block">
        <BreadcrumbNav :breadcrumbs="breadcrumbData" />
      </div>
      <TopicDetailCard @update-data="handleTitleUpdate" />
    </div>
    <div class="hidden sm:block sm:col-span-2 md:col-span-1">
      <HotTopicQuickAdd @navigate="handleNavigate" />
      <HotTopicsList />
    </div>
  </main>
</template>
