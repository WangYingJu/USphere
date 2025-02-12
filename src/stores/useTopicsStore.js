import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchTopics } from '@/apis/topics'

export const useTopicsStore = defineStore('useTopicsStore', () => {
  // 儲存初始值 sort limit page
  const keywordString = ref('')
  const sortSelect = ref('null')
  const limitNum = ref(3)
  const pageNum = ref(1)

  // 存放 topics api 資料
  const topicsData = ref([])
  // 獲取 topics api 資料
  const getTopicsData = async (params) => {
    keywordString.value = params.keyword
    limitNum.value = params.limit
    pageNum.value = params.page
    sortSelect.value = params.sort
    try {
      const res = await fetchTopics(params)
      if (params.page > 1) {
        topicsData.value = [...topicsData.value, ...res]
      } else {
        topicsData.value = res
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 清空 topics api 資料
  const clearTopicsData = () => {
    topicsData.value = []
  }

  return { topicsData, getTopicsData, pageNum, sortSelect, limitNum, keywordString, clearTopicsData }
})
