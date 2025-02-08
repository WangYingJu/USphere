<script setup>
import { onUnmounted, ref, watch } from 'vue'
import CommentCard from './CommentCard.vue'
import { fetchComments } from '@/apis/getComments'
import { createComment } from '@/apis/postComment'
import { useFormDirty } from '@/stores/useFormDirty'
import { useToast } from 'vue-toastification'

const props = defineProps({
  topic: {
    type: Object,
    required: true,
  },
})

const isLoading = ref(false)
const loadingCount = ref(0)

// 獲取 留言列表
const commentsList = ref([])
const getCommentsList = async (id) => {
  isLoading.value = true
  try {
    const res = await fetchComments(id)
    commentsList.value = res
    isLoading.value = false
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}

const tempComment = ref('')
const charCount = ref(0)
const maxLength = 280
const isSubimtComment = ref(false)
const toast = useToast()

// 點擊 送出留言
const addComment = async () => {
  isSubimtComment.value = true
  try {
    if (tempComment.value.trim() !== '') {
      await createComment(props.topic.id, tempComment.value)
      toast.success('留言成功')
      tempComment.value = ''
      charCount.value = 0
      await getCommentsList(props.topic.id)
    } else {
      toast.warning('留言不能為空白')
    }
  } catch (error) {
    console.log(error)
    toast.error('留言失敗')
  } finally {
    isSubimtComment.value = false
  }
}

// 點擊熱門話題的時候父元件有 watch router.query.id 就會去重新拿話題資料，所以變數 topicDetail 會跟著更新，所以需要 watch props.topic
watch(
  () => props.topic,
  () => {
    if (props.topic.comments > 0) {
      loadingCount.value = props.topic.comments
      getCommentsList(props.topic.id)
    } else {
      commentsList.value = []
    }
  },
)

watch(tempComment, (newVal) => {
  // unicode範圍：\u2e80-\u9fff 為中日韓文字 \uff00-\uffef 為全形符號
  // match() 會返回陣列
  const chineseFullCharCount = (newVal.match(/[\u2e80-\u9fff\uff00-\uffef]/g) || []).length
  const englishHalfCharCount = newVal.length - chineseFullCharCount
  // 中文與全形符號佔 2 字元，英文與半形符號佔 1 字元
  charCount.value = chineseFullCharCount * 2 + englishHalfCharCount
})

const formDirtyStore = useFormDirty()
const checkFormStatus = () => {
  formDirtyStore.setFormDirty(tempComment.value.length > 0)
}
// 監聽 tempComment 的變化來變更 isFormDirty
watch(tempComment, () => {
  checkFormStatus()
})
// 在頁面離開時將 isFormDirty 設為 false
onUnmounted(() => {
  formDirtyStore.setFormDirty(false)
})
</script>

<template>
  <section class="border rounded border-gray-250 bg-white p-10 mb-4">
    <h3 class="text-lg font-bold mb-[30px]">
      留言 ({{ props.topic.comments ? props.topic.comments : 0 }})
    </h3>
    <!-- 寫下留言 -->
    <div class="flex mb-5">
      <img
        src="../assets/member.png"
        alt="User Avatar"
        class="w-10 h-10 object-cover rounded-full me-2"
      />
      <div class="w-full min-h-20 border-2 rounded border-gray-250 bg-white p-3">
        <textarea
          v-model="tempComment"
          placeholder="寫下你的留言...(英文字元280個、中文140字)"
          class="w-full max-h-52 resize-none overflow-x-hidden focus:outline-none text-base text-gray-550 break-words whitespace-pre-wrap truncate text-wrap"
          rows="4"
        ></textarea>
        <div class="flex justify-between">
          <span class="text-sm text-gray-500" :class="{ 'text-red-500': charCount > maxLength }"
            >{{ charCount }}/{{ maxLength }}</span
          >
          <button
            type="button"
            @click="addComment"
            :disabled="charCount > maxLength || isSubimtComment"
            class="text-base leading-5 text-primary-blue disabled:opacity-50"
          >
            送出留言
          </button>
        </div>
      </div>
    </div>
    <!-- 顯示已留言則數 -->
    <CommentCard :commentsList="commentsList" :isLoading="isLoading" :loadingCount="loadingCount" />
  </section>
</template>
