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
      try {
        const res = await axiosInstance.get("/aboutus");
        this.list = res.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchByCategory(id) {
      try {
        const res = await axiosInstance.get(`/category/${id}`);
        this.detail = res.data;
      } catch (err) {
        this.error = err.message;
      }
    },
    async fetchByCategoryName(name) {
      try {
        const res = await axiosInstance.get(`/category-name/${name}`);
        this.detail = res.data;
      } catch (err) {
        this.error = err.message;
      }
    },
    async fetchDisplayHome() {
      try {
        const res = await axiosInstance.get("/display/home");
        this.detail = res.data;
      } catch (err) {
        this.error = err.message;
      }
    },
  },
});
