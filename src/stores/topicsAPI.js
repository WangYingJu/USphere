import { onMounted, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'

export const useTopicsStore = defineStore('topicsAPI', () => {
  // useRoute() 顯示目前路由位置
  const route = useRoute()
  // useRouter() 使用 Router
  const router = useRouter()

  // 儲存初始值 sort limit page
  const sortSelect = ref('null')
  const limitNum = ref(3)
  const pageNum = ref(1)

  // 存放 topics api 資料
  const topicsData = ref([])
  // 獲取 topics api 資料
  const getTopicsData = async (sort, limit, page) => {
    try {
      const res = await api.get('/topics', { params: { sort, limit, page } })
      if (page > 1) {
        topicsData.value = [...topicsData.value, ...res.data.data]
      } else {
        topicsData.value = res.data.data
      }
      // 僅在當前頁數改變時更新 URL
      if (route.query.sort !== String(sort) || route.query.limit !== String(limit) || route.query.page !== String(page)) {
        router.push({ path: '/topics', query: { sort, limit, page } })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 監聽 route.query 變化
  watch(() => route.query, (newQuery) => {
    const newSort = newQuery.sort || 'null'
    const newLimit = parseInt(newQuery.limit, 10) || 3
    const newPage = parseInt(newQuery.page, 10) || 1

    if (newSort !== sortSelect.value || newLimit !== limitNum.value || newPage !== pageNum.value) {
      sortSelect.value = newSort
      limitNum.value = newLimit
      pageNum.value = newPage
      getTopicsData(sortSelect.value, limitNum.value, pageNum.value)
    }
  }, { immediate: true, deep: true })

  // 資料渲染初始化
  onMounted(() => {
    getTopicsData(sortSelect.value, limitNum.value, pageNum.value)
  })

  return { topicsData, getTopicsData, pageNum, sortSelect, limitNum }
})
