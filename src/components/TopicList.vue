<script setup>
import TopicMenuButton from './TopicMenuButton.vue'
import timeToNow from '@/time'
import { ref, onMounted } from 'vue'

// 匯入 useTopicsStore
import { useTopicsStore } from '@/stores/useTopicsStore'
import { useLoadingStore } from '@/stores/useLoadingStore'
// 寫入 Pinia store
const topicsStore = useTopicsStore()
const loadingStore = useLoadingStore()

// 載入更多按鍵 變更 api page參數
const more = () => {
  topicsStore.getTopicsData({
    keyword: topicsStore.keywordString,
    sort: topicsStore.sortSelect,
    limit: 3,
    page: topicsStore.pageNum + 1,
  })
}
// 點擊排序
const sort = (sortName) => {
  topicsStore.getTopicsData({
    sort: sortName,
    limit: 3,
    page: 1,
  })
}
// 點擊讚、回覆、珍藏
const managentTopic = (string) => {
  console.log(`${string}被點擊了`)
}
// 菜單要帶入的貼文資料
const topicData = ref({})
const addData = (topic) => {
  topicData.value = topic
}

// 資料渲染初始化
onMounted(() => {
  if (topicsStore.topicsData.length) return
  topicsStore.getTopicsData({
    limit: 3,
    page: 1,
  })
})
</script>

<template>
  <div>
    <div class="mb-5">
      <button
        @click="sort('newest')"
        type="button"
        class="text-sm text-gray-450 focus:text-primary-blue hover:text-primary-blue border rounded-full border-gray-250 focus:border-primary-blue hover:border-primary-blue bg-white px-4 py-1 me-4"
        active
      >
        最新
      </button>
      <button
        @click="sort('oldest')"
        type="button"
        class="text-sm text-gray-450 focus:text-primary-blue hover:text-primary-blue border rounded-full border-gray-250 focus:border-primary-blue hover:border-primary-blue bg-white px-4 py-1"
        active
      >
        最舊
      </button>
    </div>
    <!-- loading UI -->
    <ul
      v-if="loadingStore.isLoading || topicsStore.topicsData.length === 0"
      class="animate-pulse flex flex-col gap-5 mb-6"
      style="width: 520px"
    >
      <li
        v-for="item in loadingStore.loadingCount"
        :key="item"
        class="border rounded border-gray-250 bg-white p-5 w-full"
      >
        <div class="flex mb-4.5">
          <svg
            class="w-9 h-9 me-2 text-gray-200"
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
          <div class="bg-gray-200 h-4.5 w-48 rounded-full"></div>
          <div class="bg-gray-200 h-4 w-full rounded-full"></div>
          <div class="bg-gray-200 h-4 w-full rounded-full"></div>
          <div class="bg-gray-200 h-4 w-3/4 rounded-full"></div>
        </div>
      </li>
    </ul>
    <ul v-else class="flex flex-col gap-5 mb-6" style="width: 520px">
      <li
        v-for="topic in topicsStore.topicsData"
        :key="topic.id"
        class="border rounded border-gray-250 bg-white p-5 w-full relative"
      >
        <RouterLink
          :to="{ name: 'topicDetail', params: { id: topic.id } }"
          class="absolute inset-0"
        />
        <div class="flex mb-4.5">
          <img
            :src="topic.author_pic"
            alt="User Avatar"
            class="w-9 h-9 object-cover rounded-full me-2"
          />
          <div class="flex flex-col justify-between">
            <p class="text-sm leading-4 font-medium">{{ topic.author }}</p>
            <time class="text-xs text-gray-450">{{ timeToNow(topic.created_at) }}</time>
          </div>
          <!-- 管理貼文 -->
          <TopicMenuButton :topicData="topic" @click="addData(topic)" />
        </div>
        <p class="text-lg font-semibold mb-3">{{ topic.title }}</p>
        <p class="text-base leading-6.5 text-gray-450 mb-3 truncate">{{ topic.content }}</p>
        <div class="mb-3">
          <small v-for="item in topic.tags" :key="item" class="text-sm text-gray-450 me-3"
            >#{{ item }}</small
          >
        </div>
        <!-- icon -->
        <div class="flex items-center gap-4">
          <div class="flex items-center">
            <button
              type="button"
              @click.stop.prevent="managentTopic('回覆')"
              class="w-5 h-5 me-1 rounded-full z-10"
            >
              <img src="../assets/TopicCommentIcon.svg" alt="讚" class="w-full h-full" />
            </button>
            <p class="text-sm font-medium">{{ topic.comments }}</p>
          </div>
          <div class="flex items-center">
            <button
              type="button"
              @click.stop.prevent="managentTopic('讚')"
              class="w-5 h-5 me-1 rounded-full z-10"
            >
              <img src="../assets/TopicLikeIcon.svg" alt="讚" class="w-full h-full" />
            </button>
            <p class="text-sm font-medium">{{ topic.likes }}</p>
          </div>
          <div class="flex items-center">
            <button
              type="button"
              @click.stop.prevent="managentTopic('珍藏')"
              class="w-5 h-5 me-1 rounded-full z-10"
            >
              <img src="../assets/TopicBookmarkIcon.svg" alt="珍藏" class="w-full h-full" />
            </button>
            <p class="text-sm font-medium">{{ topic.bookmarks }}</p>
          </div>
        </div>
      </li>
    </ul>
    <button @click="more" type="button" class="block mx-auto text-xs text-primary-blue">
      載入更多話題
    </button>
  </div>
</template>
