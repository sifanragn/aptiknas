import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";

export const usePengurusStore = defineStore("pengurus", {
  state: () => ({
    list: [],
    detail: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      this.error = null;
      try {
        console.log("🌐 Fetching data dari /pengurus...");
        const res = await axiosInstance.get("/pengurus");
        console.log("📨 Response dari API:", res.data);
        
        // Handle berbagai struktur response
        if (res.data) {
          if (Array.isArray(res.data)) {
            this.list = res.data;
          } else if (res.data.data && Array.isArray(res.data.data)) {
            this.list = res.data.data;
          } else if (res.data.data && res.data.data.data && Array.isArray(res.data.data.data)) {
            this.list = res.data.data.data;
          } else {
            console.warn("❓ Struktur response tidak dikenali:", res.data);
            this.list = [];
          }
        } else {
          this.list = [];
        }
        
        console.log(`✅ Data berhasil di-load: ${this.list.length} items`);
      } catch (err) {
        console.error("❌ Error fetching pengurus:", err);
        this.error = err.response?.data?.message || err.message || "Gagal memuat data pengurus";
        this.list = [];
      } finally {
        this.loading = false;
      }
    },
    
    async fetchById(id) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axiosInstance.get(`/pengurus/${id}`);
        this.detail = res.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});