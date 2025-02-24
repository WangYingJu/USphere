import api from "@/api";

export const createComment = async (id, content) => {
  try {
    const res = await api.post(`/topics/${id}/comments`, { content }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('usphere-token')}`,
      }
    })
    return res.data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
