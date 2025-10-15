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
        const response = await axiosInstance.get("/category-dpd");
        // Menangani berbagai kemungkinan struktur response dari API
        if (response.data && Array.isArray(response.data.data)) {
          // Struktur: { success: true, data: [...] }
          this.categories = response.data.data;
        } else if (Array.isArray(response.data)) {
          // Struktur: [...] (langsung array)
          this.categories = response.data;
        } else {
          // Fallback jika struktur tidak dikenali atau data kosong
          this.categories = response.data || [];
          console.warn(
            "Struktur data kategori DPD tidak dikenali atau kosong:",
            response.data
          );
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
