<script setup>
const props = defineProps({
  breadFirstName: String,
  breadFirstPath: String,
  breadSendName: String,
})
</script>

<template>
  <section class="mb-5">
    <p class="text-sm text-gray-450 py-5px me-5">
      <RouterLink
        :to="`${props.breadFirstPath}`"
        class="focus:text-primary-blue hover:text-primary-blue"
        >{{ props.breadFirstName }}</RouterLink
      >
      > {{ props.breadSendName }}
    </p>
  </section>
</template>
