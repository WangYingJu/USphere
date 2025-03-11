import api from '@/api'

export const fetchTopics = async (params) => {
  try {
    const token = localStorage.getItem('usphere-token')
    const res = await api.get('/topics', {
      params,
      headers: {
        Authorization: token ? `Bearer ${localStorage.getItem('usphere-token')}` : undefined,
      }
    })
    return res.data.data
  } catch (error) {
    console.log(error);
    throw error
  }
}
