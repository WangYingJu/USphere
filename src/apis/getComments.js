import api from "@/api";
import { useLoadingStore } from "@/stores/useLoadingStore";

export const fetchComments = async (id) => {
  const store = useLoadingStore()
  store.setLoading(true, 3)
  try {
    const res = await api.get(`/topics/${id}/comments`)
    return res.data.data
  } catch (error) {
    console.log(error)
  } finally {
    setTimeout(() => {
      store.setLoading(false)
    }, 500)
  }
}
