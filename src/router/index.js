import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home')

const Echart = () => import(/* webpackChunkName: "chart" */ '@/views/Echart')
const Hot = () => import(/* webpackChunkName: "chart" */ '@/views/Echart/Hot')
const Map = () => import(/* webpackChunkName: "chart" */ '@/views/Echart/Map')
const User = () => import(/* webpackChunkName: "chart" */ '@/views/Echart/User')

const Location = () => import(/* webpackChunkName: "location" */ '@/views/Location')

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
