import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";

export const useReportStore = defineStore("report", {
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
        const res = await axiosInstance.get("/report");
        this.list = res.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchById(id) {
      try {
        const res = await axiosInstance.get(`/${id}`);
        this.detail = res.data;
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
