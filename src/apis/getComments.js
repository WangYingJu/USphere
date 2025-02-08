import api from "@/api";

export const fetchComments = async (id) => {
  try {
    const res = await api.get(`/topics/${id}/comments`)
    return res.data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
