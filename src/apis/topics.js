import api from '@/api'

export const fetchTopics = async (params) => {
  try {
    const res = await api.get('/topics', { params })
    return res.data.data
  } catch (error) {
    console.log(error);
  }
}
