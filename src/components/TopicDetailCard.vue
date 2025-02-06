<script setup>
import CommentSection from '@/components/CommentSection.vue'
import TopicMenuButton from './TopicMenuButton.vue'
import { useRoute } from 'vue-router'
import { ref, defineEmits, onMounted, watch } from 'vue'
import timeToNow from '@/time'
import { fetchTopicDetail } from '@/apis/topicDetail'
import { useLoadingStore } from '@/stores/useLoadingStore'

// useRoute() 顯示目前路由位置
const route = useRoute()
const topicDetail = ref({})
const store = useLoadingStore()
// 自定義事件 命名為 update-data
const emit = defineEmits(['update-data'])

// 獲取 topics 詳細內容資料 api
const getTopicDetail = async () => {
  try {
    const res = await fetchTopicDetail(route.params.id)
    topicDetail.value = res
    // 傳遞資料給父元件
    if (topicDetail.value.title) {
      emit('update-data', topicDetail.value.title)
    }
  } catch (error) {
    console.log(error)
  }
}
// 監聽路由變化，因為當點擊熱門話題列表時會改變路由 id，並取得相應的詳細資料儲存到 topicDetail
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
    <!-- loading UI -->
    <div v-if="store.isLoading || topicDetail.title === undefined" class="animate-pulse">
      <div class="flex mb-5">
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
        <div class="flex flex-col justify-between">
          <div class="w-16 h-3.5 bg-gray-200 rounded-full"></div>
          <div class="w-12 h-3 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <div class="bg-gray-200 h-8 w-1/2 rounded-full"></div>
        <div class="bg-gray-200 h-4 w-full rounded-full"></div>
        <div class="bg-gray-200 h-4 w-full rounded-full"></div>
        <div class="bg-gray-200 h-4 w-3/4 rounded-full"></div>
      </div>
    </div>
    <div v-else>
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
        <!-- 管理貼文 -->
        <TopicMenuButton :topicData="topicDetail" />
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
  </div>
  <div class="mb-4">
    <CommentSection :topic="topicDetail" />
  </div>
</template>
