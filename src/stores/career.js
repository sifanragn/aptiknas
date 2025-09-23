import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";

export const useCareerStore = defineStore("career", {
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
        const res = await axiosInstance.get("/career");
        console.log("Raw career API response:", res.data);
        
        // Handle berbagai struktur response
        if (res.data && res.data.status !== undefined) {
          // Response format: { status: true, message: "...", data: { data: [...] } }
          if (res.data.data && res.data.data.data && Array.isArray(res.data.data.data)) {
            this.list = res.data.data.data;
          }
          // Fallback: jika data langsung array dalam data property
          else if (res.data.data && Array.isArray(res.data.data)) {
            this.list = res.data.data;
          }
          else {
            this.list = [];
            console.warn("Struktur data tidak dikenali dalam response:", res.data);
          }
        } 
        // Response langsung array
        else if (Array.isArray(res.data)) {
          this.list = res.data;
        }
        // Response pagination tanpa status flag
        else if (res.data && Array.isArray(res.data.data)) {
          this.list = res.data.data;
        }
        else {
          this.list = [];
          console.warn("Struktur response tidak dikenali:", res.data);
        }
        
      } catch (err) {
        this.error = err.message;
        this.list = [];
        console.error("Error fetching career:", err);
      } finally {
        this.loading = false;
      }
    },

    async fetchById(id) {
      this.loading = true;
      this.error = null;
      this.detail = null;
      try {
        const res = await axiosInstance.get(`/career/${id}`);
        this.detail = res.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});