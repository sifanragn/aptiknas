import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";

export const useSliderStore = defineStore("slider", {
  state: () => ({
    list: [],
    home: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      try {
        const res = await axiosInstance.get("/slider");
        this.list = res.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchHome() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axiosInstance.get("/slider/home");
        // Ensure the state is always an array to prevent runtime errors.
        if (Array.isArray(res.data)) {
          this.home = res.data;
        } else {
          this.home = [];
          console.warn(
            'Data fetched for "home" slider is not an array:',
            res.data
          );
        }
      } catch (err) {
        this.error = err.message;
        this.home = []; // Also reset on error
      } finally {
        this.loading = false;
      }
    },
  },
});
