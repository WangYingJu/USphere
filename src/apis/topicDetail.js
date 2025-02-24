import api from '@/api'

export const fetchTopicDetail = async (id) => {
  try {
    const res = await api.get(`/topics/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('usphere-token')}`
      }
    })
    return res.data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
