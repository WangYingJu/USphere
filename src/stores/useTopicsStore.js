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
      return res
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  // 清空 topics api 資料
  const clearTopicsData = () => {
    topicsData.value = []
  }
  // 更新 topicsData 資料
  const reFetchTopics = async () => {
    try {
      const newLimit = limitNum.value * pageNum.value
      const res = await fetchTopics({
        keyword: keywordString.value,
        limit: newLimit,
        sort: sortSelect.value,
      })
      topicsData.value.map((item) => {
        const topic = res.find((topic) => topic.id === item.id)
        if (topic) {
          item.can_edit_topics = topic.can_edit_topics
        }

        return item
      })
      return res
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return { topicsData, getTopicsData, pageNum, sortSelect, limitNum, keywordString, clearTopicsData, reFetchTopics }
})
