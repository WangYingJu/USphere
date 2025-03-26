<script setup>
import HotTopicQuickAdd from '@/components/HotTopicQuickAdd.vue'
import HotTopicsList from '@/components/HotTopicsList.vue'
import MembershipPromo from '@/components/MembershipPromo.vue'
import TopicList from '@/components/TopicList.vue'
import { useRouter } from 'vue-router'
import { useFormDirty } from '@/stores/useFormDirty'
import { onMounted, onUnmounted } from 'vue'

const router = useRouter()
const formDirtyStore = useFormDirty()

// 接收來自子元件 HotTopicQuickAdd 的自定義事件
// 點擊 新增話題按鈕 導航至 新增話題頁面
const handleNavigate = () => {
  if (!formDirtyStore.isFormDirty) {
    router.push('/add-topic')
  }
}
// 初始渲染時將 isFormDirty 設為 false
onMounted(() => {
  formDirtyStore.setFormDirty(false)
})
// 在頁面離開時將 isFormDirty 設為 false
onUnmounted(() => {
  formDirtyStore.setFormDirty(false)
})
</script>

<template>
  <main
    class="relative container grid grid-cols-1 sm:grid-cols-5 md:grid-cols-4 gap-5 sm:pb-[30px]"
  >
    <div class="hidden md:block sm:col-span-1 pt-[159px] sm:pt-[121px]">
      <MembershipPromo />
    </div>
    <div
      class="relative w-[calc(100%_+_3rem)] left-[-1.5rem] sm:w-full sm:left-0 sm:col-span-3 md:col-span-2 pt-[159px] sm:pt-[91px]"
    >
      <TopicList />
    </div>
    <div class="hidden sm:block sm:col-span-2 md:col-span-1 pt-[159px] sm:pt-[121px]">
      <HotTopicQuickAdd @navigate="handleNavigate" />
      <HotTopicsList />
    </div>
  </main>
</template>
