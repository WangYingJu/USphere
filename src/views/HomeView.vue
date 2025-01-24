<script setup>
import HotTopicQuickAdd from '@/components/HotTopicQuickAdd.vue'
import HotTopicsList from '@/components/HotTopicsList.vue'
import SidebarAd from '@/components/SidebarAd.vue'
import TopicList from '@/components/TopicList.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 接收來自子元件 HotTopicQuickAdd 的自定義事件
// 點擊 新增話題按鈕 導航至 新增話題頁面
const handleNavigate = () => {
  router.push('/add-topic')
}
</script>

<template>
  <main class="container container-customizing-1060 flex justify-between my-[30px]">
    <SidebarAd />
    <TopicList />
    <div class="right-sidebar">
      <HotTopicQuickAdd @navigate="handleNavigate" />
      <HotTopicsList />
    </div>
  </main>
</template>
