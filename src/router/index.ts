import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import NewsView from '../views/NewsView.vue'
import AgendaView from '../views/AgendaView.vue'
import DPAView from '../views/DPAView.vue'
import DPPView from '@/views/DPPView.vue'
import DPDView from '@/views/DPDView.vue'
import DPDaerahView from '@/views/DPDaerahView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/news',
    name: 'News',
    component: NewsView
  },
  {
    path: '/agenda',
    name: 'Agenda',
    component: AgendaView
  },
  {
    path: '/dpa',
    name: 'DPA',
    component: DPAView
  },
  {
    path: '/dpp',
    name: 'DPP',
    component: DPPView
  },
  {
    path: '/dpd',
    name: 'DPD',
    component: DPDView
  },
  {
    path: '/dpdaerah',
    name: 'DPDaerah',
    component: DPDaerahView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router