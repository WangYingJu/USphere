import api from '@/api'

export const fetchLogout = async () => {
  try {
    const res = await api.post('/auth/logout', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('usphere-token')}`,
      }
    })
    return res
  } catch (error) {
    console.log(error)
    throw error
  }
}
