import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AvatarView from '../views/AvatarView.vue'
import TopicDetailView from '../views/TopicDetailView.vue'
import AddTopicView from '@/views/AddTopicView.vue'
import { useLoginUser } from '@/stores/useLoginUser'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      meta: { requiresAuth: true },
    },
  ],
})

// 全域路由守衛
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    // whoami 先執行完畢後，再根據 isLogin 判斷是否放行
    await useLoginUser().checkWhoami()

    // whoami API 執行完後，再根據 isLogin 判斷是否放行
    if (!useLoginUser().isLogin) {
      next('/') // 未登入，導回首頁
    } else {
      next() // 已登入，正常進入
    }
  } else {
    next() // 不需要驗證的頁面，直接放行
  }
})

export default router
