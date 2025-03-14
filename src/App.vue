<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import LoginDialog from './components/LoginDialog.vue'
import { useLoginDialog } from './stores/useLoginDialog'
import { useLoginUser } from './stores/useLoginUser'
import { onMounted } from 'vue'
import LoadingUI from './components/LoadingUI.vue'
import { useLoading } from './stores/useLoading'

const loginDialogStore = useLoginDialog()
const loadingStore = useLoading()
const loginUserStore = useLoginUser()

onMounted(() => {
  loginUserStore.checkWhoami()
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
  <LoginDialog v-if="loginDialogStore.isShowDialog" />
  <LoadingUI v-if="loadingStore.isLoading" />
</template>
