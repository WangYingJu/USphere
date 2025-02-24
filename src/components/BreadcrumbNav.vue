<script setup>
const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<template>
  <section class="w-full mb-5">
    <ul class="text-sm text-gray-450 py-5px flex truncate">
      <!-- 如果是最後一項，添加 truncate w-full -->
      <li
        v-for="(item, idx) in props.breadcrumbs"
        :key="idx"
        :class="{
          'truncate w-full': idx === breadcrumbs.length - 1,
        }"
      >
        <RouterLink
          v-if="item.path"
          :to="item.path"
          class="focus:text-primary-blue hover:text-primary-blue"
          >{{ item.name }}</RouterLink
        >
        <span v-else>{{ item.name }}</span>
        <!-- 如果不是最後一項，添加分隔符號 -->
        <span v-if="idx < breadcrumbs.length - 1" class="px-1">&#062;</span>
      </li>
    </ul>
  </section>
</template>
