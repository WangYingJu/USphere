import api from "@/api";

export const updateTopic = async (id, params) => {
  try {
    await api.patch(`/topics/${id}`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('usphere-token')}`,
      }
    })
    return
  } catch (error) {
    console.log('updateTopic:', error)
    throw error
  }
}
