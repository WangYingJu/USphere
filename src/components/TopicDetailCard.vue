<script setup>
import CommentSection from '@/components/CommentSection.vue'
import { useRoute } from 'vue-router'
import { ref, defineEmits, onMounted, watch } from 'vue'
import timeToNow from '@/time'
import api from '@/api'

// useRoute() 顯示目前路由位置
const route = useRoute()
const topicDetail = ref({})
// 自定義事件 命名為 update-data
const emit = defineEmits(['update-data'])

// 獲取 topics 詳細內容資料 api
const getTopicDetail = async () => {
  try {
    const res = await api.get(`/topics/${route.params.id}`)
    topicDetail.value = res.data.data
    // 傳遞資料給父元件
    if (topicDetail.value.title) {
      emit('update-data', topicDetail.value.title)
    }
  } catch (error) {
    console.log(error)
  }
}
// 監聽路由變化
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) return getTopicDetail()
  },
)
// 資料渲染初始化
onMounted(() => {
  getTopicDetail()
})
</script>

<template>
  <div class="w-full border rounded border-gray-250 bg-white py-[30px] px-10 mb-[30px]">
    <!-- 發表者資訊 -->
    <div class="flex items-center mb-5">
      <img
        :src="topicDetail.author_pic"
        alt="User Avatar"
        class="w-10 h-10 object-cover rounded-full me-2"
      />
      <div>
        <p class="text-sm leading-4 font-medium">{{ topicDetail.author }}</p>
        <time class="text-xs text-gray-450">{{ timeToNow(topicDetail.created_at) }}</time>
      </div>
    </div>
    <!-- 主標 -->
    <h2 class="text-2.5xl leading-11 font-bold mb-2">{{ topicDetail.title }}</h2>
    <!-- 內文 -->
    <p class="text-base leading-6.5 text-gray-450 mb-6">{{ topicDetail.content }}</p>
    <!-- icon -->
    <div class="flex items-center gap-4">
      <!-- 留言數 -->
      <div class="flex">
        <button type="button">
          <img src="../assets/TopicCommentIcon.svg" alt="" class="w-5 h-auto me-1" />
        </button>
        <p class="text-sm font-medium">{{ topicDetail.comments }}</p>
      </div>
      <!-- 按讚數 -->
      <div class="flex">
        <button type="button">
          <img src="../assets/TopicLikeIcon.svg" alt="" class="w-5 h-auto me-1" />
        </button>
        <p class="text-sm font-medium">{{ topicDetail.likes }}</p>
      </div>
      <!-- 典藏數 -->
      <div class="flex">
        <button type="button">
          <img src="../assets/TopicBookmarkIcon.svg" alt="" class="w-5 h-auto me-1" />
        </button>
        <p class="text-sm font-medium">{{ topicDetail.bookmarks }}</p>
      </div>
    </div>
  </div>
  <div class="mb-4">
    <CommentSection />
  </div>
</template>
