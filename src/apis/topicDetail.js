import api from '@/api'

export const fetchTopicDetail = async (id) => {
  try {
    const res = await api.get(`/topics/${id}`)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}
