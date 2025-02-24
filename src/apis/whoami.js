import api from '@/api'

export const fetchUserInfo = async () => {
  try {
    const res = await api.get('/auth/whoami', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('usphere-token')}`,
      }
    })
    return res.data
  } catch (error) {
    console.log(error);
    throw error
  }
}
