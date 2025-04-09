import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import VideoPage from '../pages/VideoPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import SingleVideo from '@/pages/SingleVideo.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/videos', component: VideoPage },
  { path: '/videos/{id}', component: SingleVideo },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage }
]
export const router = createRouter({
  history: createWebHistory(),
  routes
})
