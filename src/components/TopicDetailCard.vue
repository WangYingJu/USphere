<script setup>
import CommentSection from '@/components/CommentSection.vue'
</script>

<template>
  <div class="w-full border rounded border-gray-250 bg-white py-[30px] px-10 mb-[30px]">
    <!-- 發表者資訊 -->
    <div class="flex items-center mb-5">
      <img
        src="../assets/member.png"
        alt="User Avatar"
        class="w-10 h-10 object-cover rounded-full me-2"
      />
      <div>
        <p class="text-sm leading-4 font-medium">傑西大叔</p>
        <time class="text-xs text-gray-450">10 小時前</time>
      </div>
    </div>
    <!-- 主標 -->
    <h2 class="text-2.5xl leading-11 font-bold mb-2">金澤的步調很適合慢慢的來品一品這個城市</h2>
    <!-- 內文 -->
    <p class="text-base leading-6.5 text-gray-450 mb-6">
      這次就特別報名了OMO的城市導覽行程<br />讓在地人帶我繞一圈看看這一區有什麼東西？<br />這樣繞了一圈的好處，可以大概知道要去哪邊覓食<br />那邊可能會有夜生活，還有在地人推薦的口袋餐廳<br />星野的OMO系列幾乎每個城市都有類似的導覽<br />是傑西蠻推薦大家的一個免費行程
    </p>
    <!-- icon -->
    <div class="flex items-center gap-4">
      <!-- 留言數 -->
      <div class="flex">
        <button type="button">
          <img src="../assets/TopicCommentIcon.svg" alt="" class="w-5 h-auto me-1" />
        </button>
        <p class="text-sm font-medium">3</p>
      </div>
      <!-- 按讚數 -->
      <div class="flex">
        <button type="button">
          <img src="../assets/TopicLikeIcon.svg" alt="" class="w-5 h-auto me-1" />
        </button>
        <p class="text-sm font-medium">17</p>
      </div>
      <!-- 典藏數 -->
      <div class="flex">
        <button type="button">
          <img src="../assets/TopicBookmarkIcon.svg" alt="" class="w-5 h-auto me-1" />
        </button>
        <p class="text-sm font-medium">48</p>
      </div>
    </div>
  </div>
  <div class="mb-4">
    <CommentSection />
  </div>
</template>
