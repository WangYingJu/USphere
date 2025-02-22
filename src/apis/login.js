import api from '@/api'

export const fetchLogin = async (params) => {
  try {
    const res = await api.post('/auth/login', params)
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
