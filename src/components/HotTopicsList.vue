<script setup>
import api from '@/api'
import { onMounted, ref } from 'vue'

const popularTopicsData = ref([])

// 資料渲染初始化
onMounted(() => {
  getPopularTopics('popular', 5)
})
// 獲取 popularTopics 列表資料
const getPopularTopics = async (sort, limit) => {
  try {
    const res = await api.get('/topics', { params: { sort, limit } })
    popularTopicsData.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="border rounded border-gray-250 bg-white p-5" style="width: 250px">
    <h3 class="text-sm font-bold">熱門話題</h3>
    <ul>
      <li
        v-for="topic in popularTopicsData"
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
