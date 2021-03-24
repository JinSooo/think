import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/Home')

const Echart = () => import('@/views/Echart')
const Hot = () => import('@/views/Echart/Hot')
const Map = () => import('@/views/Echart/Map')
const User = () => import('@/views/Echart/User')

const Location = () => import('@/views/Location')

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
      },
      {
        path: '/echart/map',
        name: 'Map',
        component: Map
      },
      {
        path: '/echart/user',
        name: 'User',
        component: User
      }
    ]
  },
  {
    path: '/location',
    name: 'Location',
    component: Location
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
