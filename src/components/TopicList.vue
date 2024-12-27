<script setup>
import axios from 'axios'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import relativeTime from 'dayjs/plugin/relativeTime'
import { onMounted, ref } from 'vue'

// 啟用 dayjs 套件方法
dayjs.extend(utc)
dayjs.extend(relativeTime)

// 存放 topics api 資料
const topicsData = ref([])
// 獲取 topics api 資料
const getTopicsData = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_DOMAIN}/topics`, { params: { page: 1 } })
    topicsData.value = res.data.data
  } catch (error) {
    console.log(error)
  }
}
// 資料渲染初始化
onMounted(() => {
  getTopicsData()
})
// 到現在為止的時間
function timeToNow(time) {
  const result = dayjs(time).toNow(true)
  return result
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
        v-for="topics in topicsData"
        :key="topics.topicId"
        class="border rounded border-gray-250 bg-white p-5 w-full"
      >
        <RouterLink :to="{ name: 'topicDetail', params: { id: topics.topicId } }">
          <div class="flex mb-4.5">
            <img
              :src="topics.authorPic"
              alt="User Avatar"
              class="w-9 h-9 object-cover rounded-full me-2"
            />
            <div>
              <p class="text-sm leading-4 font-medium">{{ topics.author }}</p>
              <time class="text-xs text-gray-450">{{ timeToNow(topics.createdAt) }}</time>
            </div>
          </div>
          <p class="text-lg font-semibold mb-3">{{ topics.title }}</p>
          <div class="mb-3">
            <small v-for="item in topics.tags" :key="item" class="text-sm text-gray-450 me-3"
              >#{{ item }}</small
            >
          </div>
          <div class="flex justify-between items-center">
            <!-- icon -->
            <div class="flex items-center gap-4">
              <div class="flex">
                <img src="../assets/TopicCommentIcon.svg" alt="" class="w-5 h-auto me-1" />
                <p class="text-sm font-medium">{{ topics.comments }}</p>
              </div>
              <div class="flex">
                <img src="../assets/TopicLikeIcon.svg" alt="" class="w-5 h-auto me-1" />
                <p class="text-sm font-medium">{{ topics.likes }}</p>
              </div>
              <div class="flex">
                <img src="../assets/TopicBookmarkIcon.svg" alt="" class="w-5 h-auto me-1" />
                <p class="text-sm font-medium">{{ topics.bookmarks }}</p>
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
    <button type="button" class="block mx-auto text-xs text-primary-blue">載入更多話題</button>
  </div>
</template>
