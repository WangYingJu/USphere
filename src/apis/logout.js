import api from '@/api'

export const fetchLogout = async () => {
  try {
    const res = await api.post('/auth/logout', undefined, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('usphere-token')}`,
      }
    })
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
