<script setup>
import { defineEmits } from 'vue'
import { useLoginDialog } from '@/stores/useLoginDialog'
import { fetchUserInfo } from '@/apis/whoami'
import { useLoginUser } from '@/stores/useLoginUser'
import { useToast } from 'vue-toastification'
import { useLoading } from '@/stores/useLoading'

const loginUserStore = useLoginUser()
const loginDialogStore = useLoginDialog()
const toast = useToast()
const loadingStore = useLoading()

// 確認 token 是否有效
const checkWhoami = async () => {
  try {
    const res = await fetchUserInfo()
    loginUserStore.setUserInfo(res.user.name, res.user.pic)
    return res
  } catch (error) {
    console.log(error)
    throw error
  }
}

// 自定義事件
const emit = defineEmits(['navigate'])
function handleAbandonClick() {
<<<<<<< HEAD
  isClickAddTopic.value = true
=======
  loadingStore.setLoading(true)
>>>>>>> 5a3394b (feat: add global loading UI and integrate useLoading store.)
  //  檢查是否有有效的 token
  checkWhoami()
    .then(() => {
      // 有有效的 token
      emit('navigate')
    })
    .catch((error) => {
      // 沒有 token 或無效的 token
      console.log(error)
      toast.warning('請先登入')
      loginDialogStore.openDialog()
    })
    .finally(() => {
<<<<<<< HEAD
      isClickAddTopic.value = false
=======
      loadingStore.setLoading(false)
>>>>>>> 5a3394b (feat: add global loading UI and integrate useLoading store.)
    })
}
</script>

<template>
  <div class="border rounded border-gray-250 bg-white p-5 mb-8" style="width: 250px">
    <h2 class="text-lg font-extrabold leading-6 mb-4">USphere<br />這是屬於我們的圈子</h2>
    <p class="text-base leading-6 text-gray-350 mb-4">快來發起新話題，加入我們的圈子吧！</p>
    <button
      type="button"
      @click="handleAbandonClick"
      class="text-base leading-5 border rounded border-primary-blue bg-white hover:bg-primary-blue text-primary-blue hover:text-white w-full py-2.5 mb-4"
      :class="{
        'disabled:bg-gray-400 disabled:border-gray-400 disabled:hover:none disabled:text-white':
          isClickAddTopic,
      }"
      :disabled="isClickAddTopic"
    >
      發表新話題
    </button>
    <p class="text-base leading-5 text-center text-gray-350">喔 Yeah！</p>
  </div>
</template>
