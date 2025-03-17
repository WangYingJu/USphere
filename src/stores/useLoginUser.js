import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchUserInfo } from '@/apis/whoami'
import { useLoading } from './useLoading'

export const useLoginUser = defineStore('useLoginUser', () => {
  // 預設名稱與頭像
  const defaltName = '匿名使用者'
  const defaltPic = '/USphere/src/assets/avatarDefault.png'

  // 儲存使用者資訊
  const userInfo = ref({
    name: '',
    pic: '',
  })

  // 計算使用者名稱
  const userName = computed(() => {
    return userInfo.value.name || defaltName
  })
  // 計算使用者頭像
  const userPic = computed(() => {
    return userInfo.value.pic || defaltPic
  })

  // 設定使用者資訊
  const setUserInfo = (name, pic) => {
    userInfo.value.name = name
    userInfo.value.pic = pic
  }

  // 是否登入
  const isLogin = ref(false)

  // 設定登入狀態
  const setIsLogin = (status) => {
    isLogin.value = status
  }

  const loadingStore = useLoading()
  // 確認 token 是否有效
  const checkWhoami = async () => {
    if (!localStorage.getItem('usphere-token')) {
      setIsLogin(false) // 沒有 token，直接回傳未登入
      return
    }
    if (isLogin.value) return // 已登入，不重複執行打 API

    try {
      loadingStore.setLoading(true)
      const res = await fetchUserInfo()
      setUserInfo(res.user.name, res.user.pic)
      setIsLogin(true)
      return res
    } catch (error) {
      console.log(error)
      setIsLogin(false)
    } finally {
      loadingStore.setLoading(false)
    }
  }

  return { userName, userPic, setUserInfo, isLogin, setIsLogin, checkWhoami }
})
