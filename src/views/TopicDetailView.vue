<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import TopicDetailCard from '@/components/TopicDetailCard.vue'
import HotTopicQuickAdd from '@/components/HotTopicQuickAdd.vue'
import HotTopicsList from '@/components/HotTopicsList.vue'
import { computed, ref } from 'vue'

const topicTitle = ref('')

// 接收來自子元件的資料
function handleTitleUpdate(newTitle) {
  topicTitle.value = newTitle
}
const breadData = computed(() => [
  { name: '首頁', path: '/' },
  { name: topicTitle.value || '載入中...', path: null },
])
</script>

<template>
  <main class="container container-customizing-1060 flex justify-between gap-5 my-[30px]">
    <div class="w-full">
      <BreadcrumbNav :breadcrumbs="breadData" />
      <TopicDetailCard @update-data="handleTitleUpdate" />
    </div>
    <div class="right-sidebar">
      <HotTopicQuickAdd />
      <HotTopicsList />
    </div>
  </main>
</template>
