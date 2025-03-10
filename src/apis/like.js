import api from '@/api'

export const triggerLike = async (params) => {
  try {
    const res = await api.post('/likes', { entity_id: params.id, entity_type: params.type }, {
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
