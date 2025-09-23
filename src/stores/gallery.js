import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";

export const useGalleryStore = defineStore("gallery", {
  state: () => ({
    list: [],
    detail: null,
    home: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      this.error = null;

      try {
        // Coba berbagai endpoint yang mungkin
        const endpoints = [
          "/gallery",
          "/api/gallery",
          "/news",
          "/api/news",
          "/articles",
          "/api/articles",
        ];

        let response = null;

        for (const endpoint of endpoints) {
          try {
            response = await axiosInstance.get(endpoint);
            if (response.data) {
              console.log("Berhasil dari endpoint:", endpoint);
              break;
            }
          } catch (e) {
            console.log(`Endpoint ${endpoint} gagal:`, e.message);
            continue;
          }
        }

        if (response && response.data) {
          this.list = response.data;
        } else {
          throw new Error("Semua endpoint gallery gagal");
        }
      } catch (err) {
        this.error = err.message;
        console.error("Error fetching gallery:", err);
      } finally {
        this.loading = false;
      }
    },

    async fetchById(id) {
      try {
        const endpoints = [
          `/gallery/${id}`,
          `/api/gallery/${id}`,
          `/news/${id}`,
          `/api/news/${id}`,
        ];

        let response = null;

        for (const endpoint of endpoints) {
          try {
            response = await axiosInstance.get(endpoint);
            if (response.data) {
              break;
            }
          } catch (e) {
            continue;
          }
        }

        if (response && response.data) {
          this.detail = response.data;
        } else {
          throw new Error("Gallery item tidak ditemukan");
        }
      } catch (err) {
        this.error = err.message;
      }
    },

    async fetchHome() {
      try {
        const endpoints = [
          "/gallery-home",
          "/api/gallery-home",
          "/news-home",
          "/api/news-home",
        ];

        let response = null;

        for (const endpoint of endpoints) {
          try {
            response = await axiosInstance.get(endpoint);
            if (response.data) {
              break;
            }
          } catch (e) {
            continue;
          }
        }

        if (response && response.data) {
          this.home = response.data;
        } else {
          throw new Error("Gallery home tidak ditemukan");
        }
      } catch (err) {
        this.error = err.message;
      }
    },

    async fetchByCategory(id) {
      try {
        const endpoints = [
          `/gallery-category/${id}`,
          `/api/gallery-category/${id}`,
          `/news-category/${id}`,
          `/api/news-category/${id}`,
        ];

        let response = null;

        for (const endpoint of endpoints) {
          try {
            response = await axiosInstance.get(endpoint);
            if (response.data) {
              break;
            }
          } catch (e) {
            continue;
          }
        }

        if (response && response.data) {
          this.detail = response.data;
        } else {
          throw new Error("Gallery category tidak ditemukan");
        }
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
