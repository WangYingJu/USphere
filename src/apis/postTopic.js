import api from '@/api'

export const fetchPostTopic = async (params) => {
  try {
    const res = await api.post('/topics',params)
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}
