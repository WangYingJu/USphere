import api from '@/api'
import { useLoadingStore } from '@/stores/useLoadingStore'

export const fetchTopics = async (params) => {
  const store = useLoadingStore()
  store.setLoading(true, params.limit)
  try {
    const res = await api.get('/topics', { params })
    return res.data.data
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      store.setLoading(false)
    }, 500)
  }
}
