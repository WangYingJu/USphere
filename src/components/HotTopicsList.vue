<script setup>
import { onMounted, ref } from 'vue'

// 匯入 usePopularTopicsStore
import { usePopularTopicsStore } from '@/stores/usePopularTopicsStore'
// 寫入 Pinia store
const popularStore = usePopularTopicsStore()
const isLoading = ref(false)

// 資料渲染初始化
onMounted(() => {
  if (popularStore.popularTopicsData.length > 0) return
  isLoading.value = true
  popularStore
    .getPopularTopics({
      keyword: '',
      sort: 'popular',
      limit: 5,
      page: 1,
    })
    .finally(() => {
      isLoading.value = false
    })
})
</script>

<template>
  <div class="border rounded border-gray-250 bg-white p-5">
    <h3 class="text-sm font-bold">熱門話題</h3>
    <ul>
      <li
        v-for="(topic, idx) in popularStore.popularTopicsData"
        :key="topic.id"
        class="text-sm font-medium pt-5 pb-3 hover:text-primary-blue line-clamp-2"
        :class="{ 'border-b border-gray-250': idx !== popularStore.popularTopicsData.length - 1 }"
      >
        <RouterLink :to="{ name: 'topicDetail', params: { id: topic.id } }" class="line-clamp-2">{{
          topic.title
        }}</RouterLink>
      </li>
    </ul>
    <!-- loading UI -->
    <ul v-if="isLoading">
      <li v-for="item in 5" :key="item" class="animate-pulse pt-5 pb-3 border-b">
        <div class="bg-gray-200 h-3.5 w-full rounded-full"></div>
      </li>
    </ul>
  </div>
</template>
