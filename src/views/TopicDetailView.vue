<script setup>
import BreadcrumbNav from '@/components/BreadcrumbNav.vue';
import TopicDetailCard from '@/components/TopicDetailCard.vue';
import HotTopicQuickAdd from '@/components/HotTopicQuickAdd.vue';
import HotTopicsList from '@/components/HotTopicsList.vue';
</script>

<template>
  <main class="container container-customizing-1060 flex justify-between gap-5 my-[30px]">
    <div class="w-full">
      <BreadcrumbNav />
      <TopicDetailCard />
    </div>
    <div class="right-sidebar">
      <HotTopicQuickAdd />
      <HotTopicsList />
    </div>
  </main>
</template>
