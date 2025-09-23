import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";

export const useAgendaStore = defineStore("agenda", {
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
        const res = await axiosInstance.get("/agenda");
        console.log("Raw API response:", res.data);
        
        // Handle struktur response berdasarkan data API yang diberikan
        if (res.data && res.data.status !== undefined) {
          // Response format: { status: true, message: "...", data: { data: [...] } }
          if (res.data.data && res.data.data.data && Array.isArray(res.data.data.data)) {
            this.list = res.data.data.data;
            console.log("Data extracted from res.data.data.data:", this.list);
          }
          // Fallback: jika data langsung array dalam data property
          else if (res.data.data && Array.isArray(res.data.data)) {
            this.list = res.data.data;
            console.log("Data extracted from res.data.data:", this.list);
          }
          else {
            this.list = [];
            console.warn("Struktur data tidak dikenali dalam response:", res.data);
          }
        } 
        // Response langsung array
        else if (Array.isArray(res.data)) {
          this.list = res.data;
          console.log("Data is direct array:", this.list);
        }
        // Response Laravel pagination tanpa status flag
        else if (res.data && Array.isArray(res.data.data)) {
          this.list = res.data.data;
          console.log("Data extracted from res.data.data (no status):", this.list);
        }
        else {
          this.list = [];
          console.warn("Struktur response tidak dikenali:", res.data);
        }
        
      } catch (err) {
        this.error = err.message;
        this.list = [];
        console.error("Error fetching agenda:", err);
      } finally {
        this.loading = false;
      }
    },

    async fetchById(id) {
      this.loading = true;
      this.error = null;
      this.detail = null;
      try {
        const res = await axiosInstance.get(`/agenda/${id}`);
        this.detail = res.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});