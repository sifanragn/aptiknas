import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";

export const useAboutusStore = defineStore("aboutus", {
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
        const res = await axiosInstance.get("/aboutus");
        console.log("Raw API response:", res.data);
        
        // Handle berbagai struktur response
        if (res.data && res.data.success !== undefined) {
          // Response format: { success: true, data: [...] }
          if (res.data.data && Array.isArray(res.data.data)) {
            this.list = res.data;
          } else {
            this.list = [];
            console.warn("Struktur data tidak dikenali:", res.data);
          }
        } 
        // Response langsung array
        else if (Array.isArray(res.data)) {
          this.list = res.data;
        }
        // Response Laravel pagination
        else if (res.data && Array.isArray(res.data.data)) {
          this.list = res.data;
        }
        else {
          this.list = [];
          console.warn("Struktur response tidak dikenali:", res.data);
        }
        
      } catch (err) {
        this.error = err.message || "Gagal memuat data tentang kami";
        this.list = [];
        console.error("Error fetching aboutus:", err);
      } finally {
        this.loading = false;
      }
    },
    async fetchByCategory(id) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axiosInstance.get(`/category/${id}`);
        this.detail = res.data;
      } catch (err) {
        this.error = err.message || "Gagal memuat data kategori";
      } finally {
        this.loading = false;
      }
    },
    async fetchByCategoryName(name) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axiosInstance.get(`/category-name/${name}`);
        this.detail = res.data;
      } catch (err) {
        this.error = err.message || "Gagal memuat data kategori";
      } finally {
        this.loading = false;
      }
    },
    async fetchDisplayHome() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axiosInstance.get("/display/home");
        this.detail = res.data;
      } catch (err) {
        this.error = err.message || "Gagal memuat data display home";
      } finally {
        this.loading = false;
      }
    },
  },
});