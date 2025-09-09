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
      try {
        const res = await axiosInstance.get("/podcast");
        this.list = res.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchById(id) {
      try {
        const res = await axiosInstance.get(`/podcast${id}`);
        this.detail = res.data;
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
