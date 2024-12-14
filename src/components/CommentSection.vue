<script setup>
function adjustHeight(event) {
  // 重設textarea高度，防止高度不斷累加
  event.target.style.height = 'auto'
  // 設定textarea為自動增長的高度
  event.target.style.height = `${event.target.scrollHeight}px`
}
import CommentCard from './CommentCard.vue'
</script>

<template>
  <section class="border rounded border-gray-250 bg-white p-10 mb-4">
    <h3 class="text-lg font-bold mb-[30px]">留言 (3)</h3>
    <!-- 寫下留言 -->
    <div class="flex mb-5">
      <img
        src="../assets/member.png"
        alt="User Avatar"
        class="w-10 h-10 object-cover rounded-full me-2"
      />
      <div class="w-full min-h-20 border-2 rounded border-gray-250 bg-white p-3 text-wrap">
        <textarea
          placeholder="寫下你的留言..."
          class="w-full max-h-52 resize-none overflow-x-hidden focus:outline-none text-base leading-none text-gray-550"
          rows="5"
          maxlength="100"
          @input="adjustHeight"
        ></textarea>
      </div>
    </div>
    <!-- 顯示已留言則數 -->
    <ul :id="CardList">
      <li>
        <CommentCard />
      </li>
    </ul>
  </section>
  <button type="button" class="block mx-auto text-xs text-primary-blue">載入更多話題</button>
</template>
