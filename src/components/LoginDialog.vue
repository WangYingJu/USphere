<script setup>
import { Form } from 'vee-validate'
import TextInput from './TextInput.vue'
import * as Yup from 'yup'
import { fetchLogin } from '@/apis/login'
import { useToast } from 'vue-toastification'
import { useLoginUser } from '@/stores/useLoginUser'
import { useLoginDialog } from '@/stores/useLoginDialog'
import { useLoading } from '@/stores/useLoading'
import { ref, onMounted, onUnmounted } from 'vue'

const toast = useToast()
const loginUserStore = useLoginUser()
const loginDialogStore = useLoginDialog()
const isClicked = ref(false)
const loadingStore = useLoading()

// 提交成功時的處理
const onSubmit = async (params) => {
  // 防止重複點擊
  if (isClicked.value) return
  isClicked.value = true
  loadingStore.setLoading(true)
  try {
    const res = await fetchLogin(params)
    loginDialogStore.closeDialog()
    toast.success(res.message)
    // 將 token 存入 localStorage
    const token = res.access_token
    localStorage.setItem('usphere-token', token)
    // 將 user 資料存入 store
    loginUserStore.setUserInfo(res.user.name, res.user.pic)
    loginUserStore.setIsLogin(true)
    return res
  } catch (error) {
    console.error(error)
    // 400 帳號密碼有一個沒填
    // 401 帳號密碼錯誤、帳號不存在
    if (error.status === 401) return toast.error('帳號或密碼錯誤')
    toast.error('登入失敗')
  } finally {
    loadingStore.setLoading(false)
    isClicked.value = false
  }
}
// 提交失敗時的處理
const isInvalidSubmit = ref(false)
const onInvalidSubmit = () => {
  isInvalidSubmit.value = true
  setTimeout(() => {
    isInvalidSubmit.value = false
  }, 1000)
}

// 驗證規則
const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
})

// dialog 渲染時 阻止背景滾動
onMounted(() => {
  document.body.style.overflow = 'hidden'
})
// dialog 卸載時 解除背景滾動
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="#app">
    <div class="fixed inset-0 bg-primary-bg flex justify-center items-center z-50">
      <div class="container sm:grid sm:grid-cols-4 md:grid-cols-3 sm:gap-5 p-6 sm:p-0">
        <div
          class="sm:col-start-2 md:col-start-2 sm:w-[calc(100%_+_2.5rem)] sm:left-[-1.25rem] sm:col-span-2 md:col-span-1 relative bg-white rounded border border-gray-250 px-5 py-11 sm:py-10"
        >
          <h2 class="sm:text-xl font-bold text-primary-blue text-center mb-5 sm:mb-9">
            歡迎回到 USphere!
          </h2>
          <Form
            @submit="onSubmit"
            :validation-schema="schema"
            @invalid-submit="onInvalidSubmit"
            class="flex flex-col gap-2 sm:gap-3 mb-4 sm:mb-3"
            @click.stop
          >
            <TextInput
              name="email"
              type="email"
              label="E-MAIL"
              placeholder="請輸入電子郵件地址"
              success-message="看起來沒問題！"
              error-message="請輸入正確的電子郵件地址"
            />
            <TextInput
              name="password"
              type="password"
              label="密碼"
              placeholder="請輸入密碼"
              success-message="看起來沒問題！"
              error-message="密碼必須是至少 6 個字元"
            />

            <div class="flex items-center gap-1 sm:gap-2">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                class="appearance-none relative peer shrink-0 w-5 sm:w-6 h-5 sm:h-6 rounded border border-gray-250 outline-gray-250 bg-white checked:bg-primary-blue checked:border-0"
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
              class="submit-btn w-full text-sm sm:text-base font-medium text-white bg-primary-blue rounded py-2 sm:py-2.5 border border-primary-blue hover:opacity-90"
              :class="{
                'disabled:border-gray-400 disabled:bg-gray-400 disabled:hover:opacity-100':
                  isClicked,
                'animate-shake': isInvalidSubmit,
              }"
              type="submit"
              :disabled="isClicked"
            >
              登入
            </button>
          </Form>
          <RouterLink to="/avatar" class="block text-sm font-normal text-primary-blue text-center"
            >還不是會員嗎?</RouterLink
          >
          <button type="button" @click="loginDialogStore.closeDialog()">
            <img src="../assets/CloseIcon.svg" alt="" class="absolute top-5 right-5 w-6 h-auto" />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
