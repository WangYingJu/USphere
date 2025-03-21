import api from "@/api";

export const deleteTopic = async (id) => {
  try {
    const res = await api.delete(`/topics/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('usphere-token')}`,
      }
    })
    return res
  } catch (error) {
    console.log('deleteTopic:刪除話題失敗', error)
    throw error
  }
}
