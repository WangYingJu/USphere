<script setup>
import timeToNow from '@/time'

// 匯入 useTopicsStore
import { useTopicsStore } from '@/stores/topicsAPI'
// 寫入 Pinia store
const store = useTopicsStore()

// 載入更多按鍵 變更 api page參數
function more() {
  store.pageNum++
  store.getTopicsData(store.pageNum)
}
</script>

<template>
  <div>
    <div class="mb-5">
      <button
        type="button"
        class="text-sm text-gray-450 focus:text-primary-blue hover:text-primary-blue border rounded-full border-gray-250 focus:border-primary-blue hover:border-primary-blue bg-white px-4 py-1 me-4"
        active
      >
        最新
      </button>
      <button
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
        class="border rounded border-gray-250 bg-white p-5 w-full"
      >
        <RouterLink :to="{ name: 'topicDetail', params: { id: topic.id } }">
          <div class="flex mb-4.5">
            <img
              :src="topic.author_pic"
              alt="User Avatar"
              class="w-9 h-9 object-cover rounded-full me-2"
            />
            <div>
              <p class="text-sm leading-4 font-medium">{{ topic.author }}</p>
              <time class="text-xs text-gray-450">{{ timeToNow(topic.created_at) }}</time>
            </div>
          </div>
          <p class="text-lg font-semibold mb-3">{{ topic.title }}</p>
          <div class="mb-3">
            <small v-for="item in topic.tags" :key="item" class="text-sm text-gray-450 me-3"
              >#{{ item }}</small
            >
          </div>
          <div class="flex justify-between items-center">
            <!-- icon -->
            <div class="flex items-center gap-4">
              <div class="flex">
                <img src="../assets/TopicCommentIcon.svg" alt="" class="w-5 h-auto me-1" />
                <p class="text-sm font-medium">{{ topic.comments }}</p>
              </div>
              <div class="flex">
                <img src="../assets/TopicLikeIcon.svg" alt="" class="w-5 h-auto me-1" />
                <p class="text-sm font-medium">{{ topic.likes }}</p>
              </div>
              <div class="flex">
                <img src="../assets/TopicBookmarkIcon.svg" alt="" class="w-5 h-auto me-1" />
                <p class="text-sm font-medium">{{ topic.bookmarks }}</p>
              </div>
            </div>
            <!-- comment user -->
            <ul class="flex comment-user">
              <li>
                <img
                  src="../assets/member.png"
                  alt="User Avatar"
                  class="w-30px h-30px object-cover rounded-full border-2 border-white"
                />
              </li>
              <li>
                <img
                  src="../assets/member.png"
                  alt="User Avatar"
                  class="w-30px h-30px object-cover rounded-full border-2 border-white"
                />
              </li>
            </ul>
          </div>
        </RouterLink>
      </li>
    </ul>
    <button @click="more" type="button" class="block mx-auto text-xs text-primary-blue">
      載入更多話題
    </button>
  </div>
</template>
