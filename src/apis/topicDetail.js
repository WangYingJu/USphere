import api from '@/api'
import { useLoadingStore } from '@/stores/useLoadingStore'

export const fetchTopicDetail = async (id) => {
  const store = useLoadingStore()
  store.setLoading(true)
  try {
    const res = await api.get(`/topics/${id}`)
    return res.data.data
  } catch (error) {
    console.log(error)
  } finally {
    setTimeout(() => {
      store.setLoading(false)
    }, 500)
  }
}
