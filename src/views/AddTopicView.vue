<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import HotTopicQuickAdd from '@/components/HotTopicQuickAdd.vue'
import HotTopicsList from '@/components/HotTopicsList.vue'

function addContentHeight(event) {
  // 重設textarea高度，防止高度不斷累加
  event.target.style.height = 'auto'
  // 設定textarea為自動增長的高度
  event.target.style.height = `${event.target.scrollHeight}px`
}
</script>

<template>
  <main class="container container-customizing-1060 flex justify-between gap-5 my-[30px]">
    <div class="w-full">
      <BreadcrumbNav />
      <div
        class="border rounded border-gray-250 bg-white py-[30px] px-10 mb-[30px] min-h-[372px] flex flex-col justify-between"
      >
        <!-- 發表者資訊 -->
        <div class="flex items-center mb-5">
          <img
            src="../assets/member.png"
            alt="User Avatar"
            class="w-10 h-10 object-cover rounded-full me-2"
          />
          <div>
            <p class="text-sm leading-4 font-medium">王小艾</p>
            <time class="text-xs text-gray-450">10 小時前 </time>
          </div>
        </div>
        <!-- 主標 -->
        <h2 class="text-2.5xl leading-11 font-bold mb-2">
          <input
            type="text"
            placeholder="請輸入標題"
            class="w-full placeholder-black outline-none"
          />
        </h2>
        <!-- 內文 -->
        <div class="w-full text-wrap mb-6">
          <textarea
            name=""
            id=""
            placeholder="請輸入內容"
            class="w-full h-auto resize-none overflow-hidden focus:outline-none text-base leading-6.5 text-gray-450"
            rows="1"
            @input="addContentHeight"
          ></textarea>
        </div>
        <!-- 編輯選項 -->
        <div class="mt-auto">
          <div class="flex justify-end items-center gap-10">
            <button type="button" class="text-sm text-gray-550">忍痛放棄</button>
            <button type="button" class="text-sm text-primary-blue">發表新話題</button>
          </div>
        </div>
      </div>
    </div>
    <div class="right-sidebar">
      <HotTopicQuickAdd />
      <HotTopicsList />
    </div>
  </main>
</template>
