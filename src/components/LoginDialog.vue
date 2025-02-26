<script setup>
import { Form } from 'vee-validate'
import TextInput from './TextInput.vue'
import * as Yup from 'yup'
import { fetchLogin } from '@/apis/login'
import { useToast } from 'vue-toastification'
import { useLoginUser } from '@/stores/useLoginUser'
import { useLoginDialog } from '@/stores/useLoginDialog'
import { ref } from 'vue'

const toast = useToast()
const loginUserStore = useLoginUser()
const loginDialogStore = useLoginDialog()
const isClicked = ref(false)

// 提交成功時的處理
const onSubmit = async (params) => {
  // 防止重複點擊
  if (isClicked.value) return
  isClicked.value = true
  try {
    const res = await fetchLogin(params)
    loginDialogStore.closeDialog()
    toast.success(res.message)
    // 將 token 存入 localStorage
    const token = res.access_token
    localStorage.setItem('usphere-token', token)
    // 將 user 資料存入 store
    loginUserStore.setUserInfo(res.user.name, res.user.pic)
    return res
  } catch (error) {
    console.error(error)
    // 400 帳號密碼有一個沒填
    // 401 帳號密碼錯誤、帳號不存在
    if (error.status === 401) return toast.error('帳號或密碼錯誤')
    toast.error('登入失敗')
  } finally {
    isClicked.value = false
  }
}
// 提交失敗時的處理
const onInvalidSubmit = () => {
  const submitBtn = document.querySelector('.submit-btn')
  submitBtn.classList.add('invalid')
  setTimeout(() => {
    submitBtn.classList.remove('invalid')
  }, 1000)
}

// 驗證規則
const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
})
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 bg-primary-bg flex justify-center items-center z-50">
      <div class="relative bg-white rounded border border-gray-250 px-5 py-10">
        <h2 class="text-xl font-bold text-primary-blue text-center mb-9">歡迎回到 USphere!</h2>
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          @invalid-submit="onInvalidSubmit"
          class="flex flex-col gap-3 w-[340px]"
          @click.stop
        >
          <TextInput
            name="email"
            type="email"
            label="E-MAIL"
            placeholder="Your email address"
            success-message="Got it, we won't spam you!"
          />
          <TextInput
            name="password"
            type="password"
            label="密碼"
            placeholder="Your password"
            success-message="Nice and secure!"
          />

          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              class="appearance-none relative peer shrink-0 w-6 h-6 rounded border border-gray-250 outline-gray-250 bg-white checked:bg-primary-blue checked:border-0"
            />
            <label for="remember-me" class="text-sm font-medium">記住我的資訊</label>
            <svg
              class="absolute w-4 h-4 mt-0.5 ms-1 hidden peer-checked:block pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" class="text-white"></polyline>
            </svg>
          </div>

          <button
            class="submit-btn w-full text-base font-medium text-white bg-primary-blue rounded py-2 hover:opacity-90"
            :class="{ 'disabled:bg-gray-400 disabled:hover:opacity-100': isClicked }"
            type="submit"
            :disabled="isClicked === true"
          >
            登入
          </button>
          <RouterLink to="/avatar" class="text-sm font-normal text-primary-blue text-center"
            >還不是會員嗎?</RouterLink
          >
        </Form>
        <button type="button" @click="loginDialogStore.closeDialog()">
          <img src="../assets/CloseIcon.svg" alt="" class="absolute top-5 right-5 w-6 h-auto" />
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.submit-btn {
  transition: transform 0.3s ease-in-out;
}
.submit-btn.invalid {
  animation: shake 0.5s;
  /* When the animation is finished, start again */
  animation-iteration-count: infinite;
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px);
  }
  10% {
    transform: translate(-1px, -2px);
  }
  20% {
    transform: translate(-3px, 0px);
  }
  30% {
    transform: translate(3px, 2px);
  }
  40% {
    transform: translate(1px, -1px);
  }
  50% {
    transform: translate(-1px, 2px);
  }
  60% {
    transform: translate(-3px, 1px);
  }
  70% {
    transform: translate(3px, 1px);
  }
  80% {
    transform: translate(-1px, -1px);
  }
  90% {
    transform: translate(1px, 2px);
  }
  100% {
    transform: translate(1px, -2px);
  }
}
</style>
