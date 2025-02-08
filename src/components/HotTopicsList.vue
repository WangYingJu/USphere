<script setup>
import { onMounted } from 'vue'

// 匯入 usePopularTopicsStore
import { usePopularTopicsStore } from '@/stores/usePopularTopicsStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
// 寫入 Pinia store
const popularStore = usePopularTopicsStore()
const loadingStore = useLoadingStore()

// 資料渲染初始化
onMounted(() => {
  if (popularStore.popularTopicsData.length > 0) return
  popularStore.getPopularTopics({
    keyword: '',
    sort: 'popular',
    limit: 5,
    page: 1,
  })
})
</script>

<template>
  <div class="border rounded border-gray-250 bg-white p-5" style="width: 250px">
    <h3 class="text-sm font-bold">熱門話題</h3>
    <!-- loading UI -->
    <ul v-if="loadingStore.isLoading || popularStore.popularTopicsData.length === 0">
      <li
        v-for="item in loadingStore.loadingCount"
        :key="item"
        class="animate-pulse pt-5 pb-3 border-b"
      >
        <div class="bg-gray-200 h-3.5 w-full rounded-full"></div>
      </li>
    </ul>
    <ul v-else>
      <li
        v-for="topic in popularStore.popularTopicsData"
        :key="topic.id"
        class="text-sm font-medium pt-5 pb-3 border-b hover:text-primary-blue"
      >
        <RouterLink :to="{ name: 'topicDetail', params: { id: topic.id } }">{{
          topic.title
        }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
