import api from "@/api";

export const updateTopic = async (id, params) => {
  try {
    await api.patch(`/topics/${id}`, params)
    return
  } catch (error) {
    console.log('updateTopic:', error)
    throw error
  }
}
