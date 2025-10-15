import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";

export const usePodcastStore = defineStore("podcast", {
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
        // Coba berbagai endpoint yang mungkin
        const endpoints = [
          "/podcast",
          "/podcast",
          "/api/podcast",
          "/api/podcast",
        ];

        let response = null;

        for (const endpoint of endpoints) {
          try {
            const res = await axiosInstance.get(endpoint);
            const contentType = res.headers["content-type"];
            if (
              res.data &&
              contentType &&
              contentType.includes("application/json")
            ) {
              response = res;
              break;
            }
          } catch (e) {
            console.log(`Endpoint ${endpoint} gagal:`, e.message);
            continue;
          }
        }

        if (response && response.data) {
          const data = response.data;
          // Handle various response structures to find the array of podcasts
          if (Array.isArray(data)) {
            this.list = data;
          } else if (data.data && Array.isArray(data.data)) {
            // Laravel pagination
            this.list = data.data;
          } else if (data.data && Array.isArray(data)) {
            // Simple { data: [...] } wrapper
            this.list = data.data;
          } else {
            throw new Error("Format data podcast tidak dikenali");
          }
        } else {
          throw new Error("Semua endpoint podcast gagal");
        }
      } catch (err) {
        this.error = err.message;
        console.error("Error fetching podcasts:", err);
      } finally {
        this.loading = false;
      }
    },

    async fetchById(id) {
      this.loading = true;
      this.error = null;
      this.detail = null;
      try {
        const endpoints = [
          `/podcasts/${id}`,
          `/podcasts/${id}`,
          `/api/podcast/${id}`,
          `/api/podcasts/${id}`,
        ];

        let response = null;

        for (const endpoint of endpoints) {
          try {
            const res = await axiosInstance.get(endpoint);
            const contentType = res.headers["content-type"];
            if (
              res.data &&
              contentType &&
              contentType.includes("application/json")
            ) {
              response = res;
              break;
            }
          } catch (e) {
            continue;
          }
        }

        if (response && response.data) {
          this.detail = response.data;
        } else {
          throw new Error("Podcast tidak ditemukan");
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
