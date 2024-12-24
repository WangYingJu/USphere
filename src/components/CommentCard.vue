<script setup>
//
</script>

<template>
  <div class="flex mb-5">
    <!-- 留言者頭像 -->
    <img src="../assets/member.png" alt="User Avatar" class="w-10 h-10 object-cover rounded-full me-2" />
    <div>
      <!-- 留言者名稱、時間 -->
      <div class="flex mb-2">
        <p class="text-sm font-medium me-3">ferdi sahin</p>
        <time class="text-sm text-gray-450">30 秒前</time>
      </div>
      <!-- 留言內容 -->
      <p class="text-sm text-gray-650 mb-2">上次去金澤跟北陸，遇到好多講中文的，在異鄉沒想到還能遇到這麼多台灣人跟其他講中文的朋友</p>
      <!-- 對留言的操作 -->
      <div class="flex gap-6">
        <button type="button" class="text-[13px] font-medium text-gray-450">讚(2)</button>
        <button type="button" class="text-[13px] font-medium text-gray-450">回覆</button>
      </div>
    </div>
  </div>
</template>
