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
  <main class="container grid grid-cols-4 gap-5 my-[30px]">
    <div class="col-span-1">
      <MembershipPromo />
    </div>
    <div class="col-span-2">
      <TopicList />
    </div>
    <div class="col-span-1">
      <HotTopicQuickAdd @navigate="handleNavigate" />
      <HotTopicsList />
    </div>
  </main>
</template>
