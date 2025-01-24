<script setup>
import { inject, ref, watch } from 'vue'
import CommentCard from './CommentCard.vue'
import { fetchComments } from '@/apis/getComments'
import { createComment } from '@/apis/postComment'

const props = defineProps({
  topic: {
    type: Object,
    required: true,
  },
})

const commentsList = ref([])
const getCommentsList = async (id) => {
  try {
    const res = await fetchComments(id)
    commentsList.value = res
  } catch (error) {
    console.log(error)
  }
}

const tempComment = ref('')
const charCount = ref(0)
const maxLength = 280

const addComment = async () => {
  try {
    if (tempComment.value) {
      await createComment(props.topic.id, tempComment.value)
      alert('留言成功')
      tempComment.value = ''
      charCount.value = 0
      await getCommentsList(props.topic.id)
    } else {
      alert('請輸入留言內容')
    }
  } catch (error) {
    console.log(error)
  }
}

// 點擊熱門話題的時候父元件有 watch router.query.id 就會去重新拿話題資料，所以變數 topicDetail 會跟著更新，所以需要 watch props.topic
watch(
  () => props.topic,
  () => {
    getCommentsList(props.topic.id)
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

// 接收 父元件提供的 isFormDirty 資料，並預設為 false
const isFormDirty = inject('isFormDirty', false)
const check = () => {
  if (tempComment.value) {
    Ｆ
    isFormDirty.value = true
  } else {
    isFormDirty.value = false
  }
}
// 監聽 tempComment 的變化來變更 isFormDirty
watch(tempComment, () => {
  check()
})
</script>

<template>
  <section class="border rounded border-gray-250 bg-white p-10 mb-4">
    <h3 class="text-lg font-bold mb-[30px]">留言 ({{ props.topic.comments }})</h3>
    <!-- 寫下留言 -->
    <div class="flex mb-5">
      <img
        src="../assets/member.png"
        alt="User Avatar"
        class="w-10 h-10 object-cover rounded-full me-2"
      />
      <div class="w-full min-h-20 border-2 rounded border-gray-250 bg-white p-3 text-wrap">
        <textarea
          v-model="tempComment"
          placeholder="寫下你的留言...(英文字元280個、中文140字)"
          class="w-full max-h-52 resize-none overflow-x-hidden focus:outline-none text-base text-gray-550"
          rows="4"
        ></textarea>
        <div class="flex justify-between">
          <span class="text-sm text-gray-500" :class="{ 'text-red-500': charCount > maxLength }"
            >{{ charCount }}/{{ maxLength }}</span
          >
          <button
            type="button"
            @click="addComment"
            :disabled="charCount > maxLength"
            class="text-base leading-5 text-primary-blue disabled:opacity-50"
          >
            送出留言
          </button>
        </div>
      </div>
    </div>
    <!-- 顯示已留言則數 -->
    <CommentCard :commentsList="commentsList" />
  </section>
  <button type="button" class="block mx-auto text-xs text-primary-blue">載入更多留言</button>
</template>
