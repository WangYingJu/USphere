<script setup>
import timeToNow from '@/time'

const props = defineProps({
  commentsList: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <ul>
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
        <p class="text-sm text-gray-650 mb-2">
          {{ comment.content }}
        </p>
        <!-- 對留言的操作 -->
        <button type="button" class="text-[13px] font-medium text-gray-450">
          讚({{ comment.likes }})
        </button>
      </div>
    </li>
  </ul>
</template>
