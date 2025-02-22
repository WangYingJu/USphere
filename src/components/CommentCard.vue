<script setup>
import { ref } from 'vue'
import timeToNow from '@/time'
import { triggerLike } from '@/apis/like'
import { useToast } from 'vue-toastification'
import { useLoginDialog } from '@/stores/useLoginDialog'

const props = defineProps({
  commentsList: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  loadingCount: {
    type: Number,
  },
})

const toast = useToast()
const loginDialogStore = useLoginDialog()

const disabledCommentId = ref({})
const handleClickLike = (id) => {
  disabledCommentId.value[id] = !disabledCommentId.value[id]
}

// 對留言按讚 post
const postLike = async (id, type) => {
  handleClickLike(id) // 防止重複點擊
  try {
    const res = await triggerLike({ id, type })
    toast.success(res.message)
    // commentsList 留言列表找到該留言並更新讚數
    props.commentsList.forEach((item) => {
      if (item.id === id) {
        item.likes = res.data.likes
      }
    })
    return res
  } catch (error) {
    console.log(error)
    if (error.status === 403) {
      toast.warning('請先登入')
      return loginDialogStore.openDialog()
    }
    toast.error('操作失敗')
  } finally {
    handleClickLike(id) // 解除防止重複點擊
  }
}
</script>

<template>
  <!-- loading UI -->
  <ul v-if="isLoading" class="animate-pulse">
    <li v-for="item in loadingCount" :key="item" class="flex mb-5">
      <svg
        class="w-10 h-10 me-2 text-gray-200"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
        />
      </svg>
      <div>
        <div class="flex mb-2">
          <div class="w-16 h-3.5 bg-gray-200 rounded-full me-3"></div>
          <div class="w-12 h-3.5 bg-gray-200 rounded-full"></div>
        </div>
        <div class="bg-gray-200 h-3.5 w-full rounded-full mb-2"></div>
        <div class="bg-gray-200 h-3.5 w-3/4 rounded-full mb-2"></div>
      </div>
    </li>
  </ul>
  <ul v-else>
    <li v-for="comment in props.commentsList" :key="comment.id" class="flex mb-5">
      <!-- 留言者頭像 -->
      <img
        :src="comment.user_pic"
        alt="User Avatar"
        class="w-10 h-10 object-cover rounded-full me-2"
      />
      <div>
        <!-- 留言者名稱、時間 -->
        <div class="flex mb-2">
          <p class="text-sm font-medium me-3">{{ comment.user_name }}</p>
          <time class="text-sm text-gray-450">{{ timeToNow(comment.updated_at) }}</time>
        </div>
        <!-- 留言內容 -->
        <p class="text-sm text-gray-650 mb-2 break-words whitespace-pre-wrap truncate text-wrap">
          {{ comment.content }}
        </p>
        <!-- 對留言的操作 -->
        <button
          type="button"
          @click="postLike(comment.id, 'comment')"
          :disabled="disabledCommentId[comment.id]"
          class="text-[13px] font-medium text-gray-450 disabled:opacity-50"
        >
          讚({{ comment.likes }})
        </button>
      </div>
    </li>
  </ul>
</template>
