import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AvatarView from '../views/AvatarView.vue'
import TopicDetailView from '../views/TopicDetailView.vue'
import AddTopicView from '@/views/AddTopicView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/topics',
      name: 'topics',
      component: HomeView,
      props: (route) => ({
        page: route.query.page || 1,
      }),
    },
    {
      path: '/avatar',
      name: 'avatar',
      component: AvatarView,
    },
    {
      path: '/topics/:id',
      name: 'topicDetail',
      component: TopicDetailView,
      props: true,
    },
    {
      path: '/add-topic',
      name: 'addTopic',
      component: AddTopicView,
    },
  ],
})

export default router
