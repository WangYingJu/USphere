<script setup>
import { defineProps } from 'vue'
import { toRef } from 'vue'
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  value: {
    type: String,
    default: undefined,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: '',
  },
  errorMessage: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})

const name = toRef(props, 'name')
// 綁定單一欄位 useField(name, rules, options)
// name: 欄位名稱
// rules: 驗證規則
// options: 設定初始值
const {
  value: inputValue, // 輸入值
  errorMessage, // 錯誤訊息
  handleBlur, // 離開輸入框時觸發
  handleChange, // 值變更時觸發驗證
  meta, // 欄位狀態: valid(是否通過驗證), touched(是否曾經點擊過), dirty(是否被修改過), pending(是否正在驗證中)
} = useField(name, undefined, {
  // undefined 這裡沒有傳入驗證規則，所以會使用 Form 上的 validationSchema
  initialValue: props.value, // 初始值為父元件的 props.value
})

const messageStatus = computed(() => {
  if (errorMessage.value) {
    return props.errorMessage
  }
  if (meta.valid) {
    return props.successMessage
  }
  return ''
})
</script>

<template>
  <div class="relative w-full" :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label :for="name" class="inline-block w-full text-sm sm:text-base sm:leading-5 align-top mb-1 sm:mb-2">{{
      label
    }}</label>
    <input
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="w-full rounded border text-sm sm:text-base p-2 sm:p-2.5"
      :class="{
        'border-gray-250 focus:outline-primary-blue': !errorMessage && !meta.valid,
        'bg-red-100 text-red-500 border-red-500 focus:outline-red-500': errorMessage,
        'bg-green-100 text-green-500 border-green-500 focus:outline-green-500': meta.valid,
      }"
    />
    <span
      class="absolute top-0 right-0 text-xs sm:text-sm leading-5"
      v-show="messageStatus"
      :class="{
        'text-red-500': errorMessage,
        'text-green-500': meta.valid,
      }"
    >
      {{ messageStatus }}
    </span>
  </div>
</template>
