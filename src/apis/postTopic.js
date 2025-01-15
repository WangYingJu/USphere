import api from '@/api'

export const fetchPostTopic = async (title, content) => {
  try {
    const res = await api.post('/topics', {
      title, content
    })
    return res.data.data
  } catch (error) {
    console.log(error)
  }
}
