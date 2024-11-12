<script setup>
//
</script>

<template>
  <header class="justify-center bg-white border primary-border py-5">
    <div class="container flex justify-between">
      <!-- logo -->
      <img alt="Vue logo" class="logo" src="@/assets/USphere.svg" width="125" height="125" />
      <!-- 搜尋bar -->
      <div class="container flex justify-between items-center border rounded-full input-bg primary-border py-3 px-4"
        style="width: 520px;">
        <input type="text" name="search-bar" id="search-bar" placeholder="尋找話題？試著輸入......寶可夢！"
          class="w-full bg-transparent">
        <svg class="h-auto w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <!-- 會員區 -->
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 flex justify-center items-center">
          <img alt="commentIcon" class="w-6 h-6 block" src="@/assets/commentIcon.svg">
        </div>
        <div class="w-10 h-10 flex justify-center items-center">
          <img alt="bellIcon" class="w-6 h-6 block" src="@/assets/bellIcon.svg">
        </div>
        <div class="w-10 h-10 rounded-full bg-slate-400 bg-[url('/src/assets/member.png')]">
        </div>
      </div>
    </div>
  </header>
</template>
