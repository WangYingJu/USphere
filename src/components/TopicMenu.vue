<script setup>
import { deleteTopic } from '@/apis/deleteTopic'
import { defineEmits, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const router = useRouter()
const toast = useToast()

// 匯入 useTopicsStore
import { useTopicsStore } from '@/stores/useTopicsStore'
// 寫入 Pinia store
const store = useTopicsStore()

const props = defineProps({
  topic: {
    type: Object,
    required: true,
  },
})

// 點擊編輯
const handleEditConfirm = async ({ id, title, content, author, author_pic }) => {
  try {
    await router.push({
      path: '/add-topic',
      query: { id, title, content, author, author_pic },
    })
  } catch (error) {
    console.log(error)
  }
}

// 定義 關閉菜單 編輯菜單 事件
const emit = defineEmits(['topic-deleted'])

// 點擊刪除
const isClicked = ref(false)
const handleDeleteConfirm = async (id) => {
  try {
    if (isClicked.value) return
    isClicked.value = true
    await deleteTopic(id)
    store.getTopicsData({
      limit: 3,
      page: 1,
    })
    toast.success('刪除成功')
    emit('topic-deleted')
    // 在話題詳情頁處理刪除話題後的導航
    if (router.currentRoute.value.path === `/topics/${id}`) {
      router.push('/')
    }
  } catch (error) {
    console.log(error)
    toast.error('刪除失敗')
  } finally {
    isClicked.value = false
  }
}

// 點擊檢舉
const reportTopic = () => {
  console.log('檢舉')
}
</script>

<template>
  <!-- menu -->
  <ul class="rounded border border-gray-250 bg-white">
    <li class="py-2 px-5 hover:bg-gray-250 cursor-pointer">
      <a
        @click.prevent="handleEditConfirm(props.topic)"
        class="inline-flex items-center gap-2 text-sm"
        >編輯<img src="../assets/edit.svg" alt="編輯" class="w-4 h-4"
      /></a>
    </li>
    <li class="py-2 px-5 hover:bg-gray-250 cursor-pointer">
      <a
        @click.prevent="handleDeleteConfirm(props.topic.id)"
        :disabled="isClicked"
        class="inline-flex items-center gap-2 text-sm"
        >刪除<img src="../assets/trash.svg" alt="刪除" class="w-4 h-4"
      /></a>
    </li>
    <li class="py-2 px-5 hover:bg-gray-250 cursor-pointer border-t border-gray-250">
      <a @click.prevent="reportTopic" class="inline-flex items-center gap-2 text-sm"
        >檢舉<img src="../assets/flag.svg" alt="檢舉" class="w-4 h-4"
      /></a>
    </li>
  </ul>
</template>
