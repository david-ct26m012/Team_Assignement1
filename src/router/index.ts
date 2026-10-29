import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: () => import('@/views/SessionsView.vue'),
    },
    {
      path: '/sessions/:id',
      name: 'session-detail',
      component: () => import('@/views/SessionDetailView.vue'),
    },
    {
      path: '/speakers',
      name: 'speakers',
      component: () => import('@/views/SpeakersView.vue'),
    },
    {
      path: '/speakers/:id',
      name: 'speaker-detail',
      component: () => import('@/views/SpeakerDetailView.vue'),
    },
    {
      path: '/my-program',
      name: 'my-program',
      component: () => import('@/views/MyProgramView.vue'),
    },
  ],
})

export default router
