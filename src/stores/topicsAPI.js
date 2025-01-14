import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

export const useTopicsStore = defineStore('topicsAPI', () => {
  // 儲存初始值 sort limit page
  const keywordString = ref('')
  const sortSelect = ref('null')
  const limitNum = ref(3)
  const pageNum = ref(1)

  // 存放 topics api 資料
  const topicsData = ref([])
  // 獲取 topics api 資料
  const getTopicsData = async (keyword, sort, limit, page) => {
    try {
      keywordString.value = keyword
      limitNum.value = limit
      pageNum.value = page
      sortSelect.value = sort
      const res = await api.get('/topics', { params: { keyword, sort, limit, page } })
      if (page > 1) {
        topicsData.value = [...topicsData.value, ...res.data.data]
      } else {
        topicsData.value = res.data.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 資料渲染初始化
  onMounted(() => {
    getTopicsData(keywordString.value, sortSelect.value, limitNum.value, pageNum.value)
  })

  return { topicsData, getTopicsData, pageNum, sortSelect, limitNum, keywordString }
})
