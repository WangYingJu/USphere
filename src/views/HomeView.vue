<script setup>
import HotTopicQuickAdd from '../components/HotTopicQuickAdd.vue';
import HotTopicsList from '../components/HotTopicsList.vue';
import SidebarAd from '../components/SidebarAd.vue';
import TopicList from '../components/TopicList.vue';
</script>

<template>
  <main class="container container-customizing-1060 flex justify-between my-[30px]">
    <SidebarAd></SidebarAd>
    <TopicList></TopicList>
    <div class="right-sidebar">
      <HotTopicQuickAdd></HotTopicQuickAdd>
      <HotTopicsList></HotTopicsList>
    </div>
  </main>
</template>
