<script setup>
import TopicMenuButton from './TopicMenuButton.vue'
import timeToNow from '@/time'
import { ref, onMounted } from 'vue'

// 匯入 useTopicsStore
import { useTopicsStore } from '@/stores/useTopicsStore'
// 寫入 Pinia store
const store = useTopicsStore()

// 載入更多按鍵 變更 api page參數
const more = () => {
  store.getTopicsData({
    keyword: store.keywordString,
    sort: store.sortSelect,
    limit: 3,
    page: store.pageNum + 1,
  })
}
// 點擊排序
const sort = (sortName) => {
  store.getTopicsData({
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
  if (store.topicsData.length) return
  store.getTopicsData({
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
    <ul class="flex flex-col gap-5 mb-6" style="width: 520px">
      <li
        v-for="topic in store.topicsData"
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
