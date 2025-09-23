import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfileView from "../views/ProfileView.vue";
import NewsView from "../views/NewsView.vue";
import AgendaView from "../views/AgendaView.vue";
import DPAView from "../views/DPAView.vue";
import DPPView from "@/views/DPPView.vue";
import DPDView from "@/views/DPDView.vue";
import NewsDetailView from "@/views/NewsDetailView.vue";
import DPDaerahView from "@/views/DPDaerahView.vue";
import KegiatanView from "@/views/KegiatanView.vue";
import DaftarView from "@/views/DaftarView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
  },
  {
    path: "/news",
    name: "News",
    component: NewsView,
  },
  {
    path: "/news/:id",
    name: "news-detail",
    component: NewsDetailView,
    props: true,
  },
  {
    path: "/agenda",
    name: "Agenda",
    component: AgendaView,
  },
  {
    path: "/dpa",
    name: "DPA",
    component: DPAView,
  },
  {
    path: "/dpp",
    name: "DPP",
    component: DPPView,
  },
  {
    path: "/dpd",
    name: "DPD",
    component: DPDView,
  },
  {
    path: "/dpd/:daerah",
    name: "DPDaerah",
    component: DPDaerahView,
    props: true,
  },
  {
    path: "/kegiatan",
    name: "Kegiatan",
    component: KegiatanView,
  },
  {
    path: "/daftar",
    name: "Daftar",
    component: DaftarView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
