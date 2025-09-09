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
      try {
        const res = await axiosInstance.get("/gallery");
        this.list = res.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchById(id) {
      try {
        const res = await axiosInstance.get(`/gallery/${id}`);
        this.detail = res.data;
      } catch (err) {
        this.error = err.message;
      }
    },
    async fetchHome() {
      try {
        const res = await axiosInstance.get("/gallery-home");
        this.home = res.data;
      } catch (err) {
        this.error = err.message;
      }
    },
    async fetchByCategory(id) {
      try {
        const res = await axiosInstance.get(`/gallery-category/${id}`);
        this.detail = res.data;
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
