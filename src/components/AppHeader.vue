<script setup>
//
</script>

<template>
  <header class="justify-center bg-white border-b border-gray-250 py-5">
    <div class="container container-customizing-1060 flex justify-between items-center">
      <!-- logo -->
      <RouterLink to="/">
        <img alt="USphere logo" class="logo" src="@/assets/USphere.svg" width="100" height="auto" />
      </RouterLink>
      <!-- 搜尋bar -->
      <form
        class="container flex justify-between items-center border rounded-full bg-gray-input-bg border-gray-250 py-3 px-4"
        style="width: 520px"
      >
        <input
          type="search"
          action="/search"
          method="get"
          name="search-bar"
          id="search-bar"
          placeholder="尋找話題？試著輸入......寶可夢！"
          class="w-full bg-gray-input-bg placeholder-gray-300"
        />
        <button type="button">
          <svg
            class="h-auto w-4 text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
      <!-- 會員區 -->
      <nav class="flex items-center gap-2">
        <!-- 回應通知 -->
        <RouterLink
          to="/avatar"
          class="comment-icon relative w-10 h-10 flex justify-center items-center"
        >
          <img alt="commentIcon" class="w-6 h-6 block" src="@/assets/commentIcon.svg" />
        </RouterLink>
        <!-- 系統通知 -->
        <RouterLink
          to="/avatar"
          class="bell-icon relative w-10 h-10 flex justify-center items-center"
        >
          <img alt="bellIcon" class="w-6 h-6 block" src="@/assets/bellIcon.svg" />
        </RouterLink>
        <!-- 會員 -->
        <RouterLink to="/avatar" class="w-10 h-10 rounded-full bg-slate-400">
          <img
            src="../assets/member.png"
            alt="User Avatar"
            class="w-full h-full object-cover rounded-full"
          />
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
