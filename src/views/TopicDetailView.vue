<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import TopicDetailCard from '@/components/TopicDetailCard.vue'
import HotTopicQuickAdd from '@/components/HotTopicQuickAdd.vue'
import HotTopicsList from '@/components/HotTopicsList.vue'
import { ref } from 'vue'

const topicTitle = ref('')

// 接收來自子元件的資料
function handleTitleUpdate(newTitle) {
  topicTitle.value = newTitle
}
</script>

<template>
  <main class="container container-customizing-1060 flex justify-between gap-5 my-[30px]">
    <div class="w-full">
      <BreadcrumbNav bread-first-name="首頁" bread-first-path="/" :bread-send-name="topicTitle" />
      <TopicDetailCard @update-data="handleTitleUpdate" />
    </div>
    <div class="right-sidebar">
      <HotTopicQuickAdd />
      <HotTopicsList />
    </div>
  </main>
</template>
