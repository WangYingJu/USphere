import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AvatarView from '../views/AvatarView.vue'
import TopicDetailView from '../views/TopicDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/avatar',
      name: 'avatar',
      component: AvatarView,
    },
    {
      path: '/topic',
      name: 'topicDetail',
      component: TopicDetailView,
    },
  ],
})

export default router
