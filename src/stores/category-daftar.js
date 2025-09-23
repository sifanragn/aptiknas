import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";

export const useCategoryDaftarStore = defineStore("categoryDaftar", {
  /**
   * State untuk menyimpan data kategori, status loading, dan potensi error.
   */
  state: () => ({
    categories: [],
    loading: false,
    error: null,
  }),

  /**
   * Actions untuk melakukan operasi, seperti mengambil data dari API.
   */
  actions: {
    async fetchCategories() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axiosInstance.get("/category-daftar");
        // Berdasarkan struktur JSON yang Anda berikan: { success: true, data: [...] }
        // Array kategori berada di dalam `response.data.data`
        if (response.data && Array.isArray(response.data.data)) {
          this.categories = response.data.data;
        } else {
          this.categories = response.data || [];
        }
      } catch (error) {
        this.error = error;
        console.error("Gagal mengambil data kategori:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
