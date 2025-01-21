<script setup>
import { onMounted } from 'vue'

// 匯入 usePopularTopicsStore
import { usePopularTopicsStore } from '@/stores/usePopularTopicsStore'
// 寫入 Pinia store
const store = usePopularTopicsStore()

// 資料渲染初始化
onMounted(() => {
  if (store.popularTopicsData.length) return
  store.getPopularTopics({
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
    <ul>
      <li
        v-for="topic in store.popularTopicsData"
        :key="topic.id"
        class="pt-5 pb-3 border-b hover:text-primary-blue"
      >
        <RouterLink :to="{ name: 'topicDetail', params: { id: topic.id } }">{{
          topic.title
        }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
