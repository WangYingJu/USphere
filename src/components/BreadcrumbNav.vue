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
  <section class="mb-5">
    <ul class="text-sm text-gray-450 py-5px me-5 flex">
      <li v-for="(item, idx) in props.breadcrumbs" :key="idx">
        <RouterLink
          v-if="item.path"
          :to="item.path"
          class="focus:text-primary-blue hover:text-primary-blue"
          >{{ item.name }}</RouterLink
        >
        <span v-else>{{ item.name }}</span>
        <!-- 如果不是最後一項，添加分隔符號 -->
        <span v-if="idx < breadcrumbs.length - 1" class="px-1">></span>
      </li>
    </ul>
  </section>
</template>
