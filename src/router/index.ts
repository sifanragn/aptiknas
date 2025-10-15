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
import HubungiKamiView from "@/views/HubungiKamiView.vue";
import Cobasean from "@/views/Cobasean.vue";
import DetailCardProfile from "@/components/Layout/DetailCardProfile.vue";
import LokerView from "@/views/LokerView.vue";
import LokerDetail from "@/pages/LokerPages/LokerDetail.vue";
import ContactUs from "@/pages/SupportPages/ContactUs.vue";
import HelpSupport from "@/pages/SupportPages/HelpSupport.vue";
import PrivacyPolicy from "@/pages/SupportPages/PrivacyPolicy.vue"; 
import TermsConditions from "@/pages/SupportPages/TermsConditions.vue";
import Partners from "@/pages/SupportPages/Partners.vue";

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
  {
    path: "/hubungi-kami",
    name: "HubungiKami",
    component: HubungiKamiView, 
  }
  ,
  {
    path: "/cobasean",
    name: "Cobasean",
    component: Cobasean,
  },
  {
    path: "/detail-card-profile/:id",
    name: "DetailCardProfile",
    component: DetailCardProfile,
  },

  {
    path: "/loker",
    name: "Loker",
    component: LokerView,
  },
  {
    path: "/loker/:id",
    name: "loker-detail",
    component: LokerDetail,
    props: true,
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: ContactUs,
  },
  {
    path: "/help-support",
    name: "HelpSupport",
    component: HelpSupport,
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
  },
  {
    path: "/partners",
    name: "Partners",
    component: Partners,
  },  
  {
    path: "/terms-conditions",
    name: "TermsConditions",
    component: TermsConditions,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
