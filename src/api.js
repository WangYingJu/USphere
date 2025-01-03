import axios from 'axios'
// 建立 Axios Instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  timeout: 5000,
})

export default api
