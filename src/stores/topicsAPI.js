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
  const keywordString = ref('')
  const sortSelect = ref('null')
  const limitNum = ref(3)
  const pageNum = ref(1)

  // 防止 watch 循環觸發 api
  // false：路由更新是由外部產生的
  // true：路由更新是由內部產生的，防止後續的 watch 觸發
  let isInternalChange = false

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
      // 僅在當前頁數改變時更新 URL
      if (!isInternalChange) {
        isInternalChange = true
        router.push({ path: '/topics', query: { keyword, sort, limit, page } })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 監聽 route.query 變化
  watch(() => route.query, (newQuery) => {
    if (isInternalChange) {
      isInternalChange = false
      return
    }
    const newkeyword = newQuery.keyword || ''
    const newSort = newQuery.sort || 'null'
    const newLimit = parseInt(newQuery.limit, 10) || 3
    const newPage = parseInt(newQuery.page, 10) || 1

    // 同步更新 store 中的值，並重新獲取資料
    if (newkeyword !== keywordString.value || newSort !== sortSelect.value || newLimit !== limitNum.value || newPage !== pageNum.value) {
      keywordString.value = newkeyword
      sortSelect.value = newSort
      limitNum.value = newLimit
      pageNum.value = newPage
      getTopicsData(keywordString.value, sortSelect.value, limitNum.value, pageNum.value)
      // getTopicsData(newkeyword, newSort, newLimit, newPage)
    }
  }, { immediate: true, deep: true })
  // keywordString 監聽
  watch(keywordString, (newValue) => {
    if (isInternalChange) {
      isInternalChange = false
      return
    }
    if (newValue === '') {
      sortSelect.value = 'null'
      limitNum.value = 3
      pageNum.value = 1
      getTopicsData(keywordString.value, sortSelect.value, limitNum.value, pageNum.value)
    }
  })

  // 資料渲染初始化
  onMounted(() => {
    getTopicsData(keywordString.value, sortSelect.value, limitNum.value, pageNum.value)
  })

  return { topicsData, getTopicsData, pageNum, sortSelect, limitNum, keywordString }
})
