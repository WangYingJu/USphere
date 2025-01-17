<script setup>
const edit = () => {
  console.log('編輯')
}
const deleteTopic = () => {
  console.log('刪除')
}
const reportTopic = () => {
  console.log('檢舉')
}

</script>

<template>
  <!-- menu -->
  <ul class="inline-block rounded border border-gray-250 bg-white">
    <li class="py-2 px-5 hover:bg-gray-250 cursor-pointer">
      <a @click.prevent="edit" class="inline-flex items-center gap-2 text-sm"
        >編輯<img src="../assets/edit.svg" alt="編輯" class="w-4 h-4"
      /></a>
    </li>
    <li class="py-2 px-5 hover:bg-gray-250 cursor-pointer">
      <a @click.prevent="deleteTopic" class="inline-flex items-center gap-2 text-sm"
        >刪除<img src="../assets/trash.svg" alt="刪除" class="w-4 h-4"
      /></a>
    </li>
    <li class="py-2 px-5 hover:bg-gray-250 cursor-pointer border-t border-gray-250">
      <a @click.prevent="reportTopic" class="inline-flex items-center gap-2 text-sm"
        >檢舉<img src="../assets/flag.svg" alt="檢舉" class="w-4 h-4"
      /></a>
    </li>
  </ul>
</template>
