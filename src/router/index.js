import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AvatarView from '../views/AvatarView.vue'
import TopicDetailView from '../views/TopicDetailView.vue'
import AddTopicView from '@/views/AddTopicView.vue'
import { useLoginUser } from '@/stores/useLoginUser'

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
      beforeEnter: async (to, from, next) => {
        const LoginUserStore = useLoginUser()

        // 等待 whoami api 回傳資料後才進行導航守衛
        while (LoginUserStore.isfetchUser) {
          await new Promise(resolve => {
            setTimeout(resolve, 100)
            console.log('正在檢查')
          })
        }

        if (!LoginUserStore.isLogin) {
          // 沒有登入 導回首頁
          next('/')
        } else {
          // 有登入 進入頁面
          next()
        }
      }
    },
  ],
})

export default router
