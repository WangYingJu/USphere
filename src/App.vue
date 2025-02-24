<script setup>
import AppHeader from './components/AppHeader.vue'
import LoginDialog from './components/LoginDialog.vue'
import { useLoginDialog } from './stores/useLoginDialog'

const loginDialogStore = useLoginDialog()
</script>

<template>
  <AppHeader />
  <RouterView />
  <LoginDialog v-if="loginDialogStore.isShowDialog" />
</template>
