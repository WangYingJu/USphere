import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'

export const useTopicsStore = defineStore('topicsAPI', () => {
  // useRoute() 顯示目前路由位置
  const route = useRoute()
  // useRouter() 使用 Router
  const router = useRouter()

  // 存放 topics api 資料
  const topicsData = ref([])
  // 獲取 topics api 資料
  const getTopicsData = async (page) => {
    try {
      const res = await api.get('/topics', { params: { page } })
      if (page > 1) {
        topicsData.value = [...topicsData.value, ...res.data.data]
      } else {
        topicsData.value = res.data.data
      }
      // 僅在當前頁數改變時更新 URL
      if (route.query.page !== String(page)) {
        router.push({ path: '/topics', query: { page } })
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 初始 api 打的頁數
  let pageNum = ref(parseInt(route.query.page, 10) || 1)
  // 資料渲染初始化
  onMounted(() => {
    getTopicsData(pageNum.value)
  })

  return { topicsData, getTopicsData, pageNum }
})