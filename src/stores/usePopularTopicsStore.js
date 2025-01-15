import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchTopics } from '@/apis/topics'


export const usePopularTopicsStore = defineStore('usePopularTopicsStore', () => {
  // 存放 popular topics api 資料
  const popularTopicsData = ref([])

  // 獲取 popular topics api 資料
  const getPopularTopics = async (params) => {
    try {
      const res = await fetchTopics(params)
      popularTopicsData.value = res
    } catch (error) {
      console.log(error)
    }
  }

  return { getPopularTopics, popularTopicsData }
})
