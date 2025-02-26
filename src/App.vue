<script setup>
import AppHeader from './components/AppHeader.vue'
import LoginDialog from './components/LoginDialog.vue'
import { useLoginDialog } from './stores/useLoginDialog'
import { fetchUserInfo } from './apis/whoami'
import { useLoginUser } from './stores/useLoginUser'
import { onMounted } from 'vue'

const loginDialogStore = useLoginDialog()
const loginUserStore = useLoginUser()

// 確認 token 是否有效
const checkWhoami = async () => {
  try {
    const res = await fetchUserInfo()
    loginUserStore.setUserInfo(res.user.name, res.user.pic)
    loginUserStore.setIsLogin(true)
    return res
  } catch (error) {
    console.log(error)
    loginUserStore.setIsLogin(false)
  }
}

onMounted(() => {
  if (!localStorage.getItem('usphere-token')) return
  checkWhoami()
})
</script>

<template>
  <AppHeader />
  <RouterView />
  <LoginDialog v-if="loginDialogStore.isShowDialog" />
</template>
