import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/Home')

const Echart = () => import('@/views/Echart')
const Hot = () => import('@/views/Echart/Hot')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/echart',
    name: 'Echart',
    component: Echart,
    children: [
      {
        path: '',
        redirect: '/echart/hot'
      },
      {
        path: '/echart/hot',
        name: 'Hot',
        component: Hot
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
