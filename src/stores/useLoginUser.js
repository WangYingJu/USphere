import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoginUser = defineStore('useLoginUser', () => {
  // 預設名稱與頭像
  const defaltName = '匿名使用者'
  const defaltPic = new URL('@/assets/avatarDefault.png', import.meta.url).href

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

  return { userName, userPic, setUserInfo, isLogin, setIsLogin }
})
