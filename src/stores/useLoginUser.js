import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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

  // 計算登入狀態來決定顯示的圖示
  const authIconPath = computed(() => {
    return isLogin.value ? '/USphere/src/assets/logout.svg' : '/USphere/src/assets/login.svg'
  })

  // 計算登入狀態來決定顯示的名稱
  const authIconName = computed(() => {
    return isLogin.value ? '登出' : '登入'
  })

  // 設定登入狀態
  const setAuthStatus = (status) => {
    isLogin.value = status
  }

  return { userName, userPic, setUserInfo, isLogin, authIconPath, authIconName, setAuthStatus }
})
