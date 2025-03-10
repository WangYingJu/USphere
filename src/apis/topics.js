import api from '@/api'

export const fetchTopics = async (params) => {
  try {
    const res = await api.get('/topics', {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('usphere-token')}`,
      }
    })
    return res.data.data
  } catch (error) {
    console.log(error);
    throw error
  }
}
