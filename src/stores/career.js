import { defineStore } from "pinia";
import axiosInstance from "@/api/axios";

export const useCareerStore = defineStore("career", {
  state: () => ({
    data: [],
    detail: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAll() {
      this.loading = true;
      this.error = null;
      try {
        const res = await axiosInstance.get("/career");
        console.log("Raw career API response:", res.data);

        // Handle berbagai struktur response
        if (res.data && res.data.status !== undefined) {
          // Response format: { status: true, message: "...", data: { data: [...] } }
          if (
            res.data.data &&
            res.data.data.data &&
            Array.isArray(res.data.data.data)
          ) {
            this.data = res.data.data.data;
          }
          // Fallback: jika data langsung array dalam data property
          else if (res.data.data && Array.isArray(res.data.data)) {
            this.data = res.data.data;
          } else {
            this.data = [];
            console.warn(
              "Struktur data tidak dikenali dalam response:",
              res.data
            );
          }
        }
        // Response langsung array
        else if (Array.isArray(res.data)) {
          this.data = res.data;
        }
        // Response pagination tanpa status flag
        else if (res.data && Array.isArray(res.data.data)) {
          this.data = res.data.data;
        } else {
          this.data = [];
          console.warn("Struktur response tidak dikenali:", res.data);
        }
      } catch (err) {
        this.error = err.message;
        this.data = [];
        console.error("Error fetching career:", err);
      } finally {
        this.loading = false;
      }
    },

    async fetchById(id) {
      this.loading = true;
      this.error = null;
      this.detail = null;
      try {
        const res = await axiosInstance.get(`/career/${id}`);
        this.detail = res.data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async createApplication(formData) {
      // Tidak mengubah state loading/error store utama agar tidak mengganggu UI lain
      try {
        const res = await axiosInstance.post("/career-applications", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Application submitted:", res.data);
        return res.data; // Kembalikan response untuk dihandle di komponen
      } catch (err) {
        console.error("Error creating application:", err);
        // Lempar error agar bisa ditangkap di komponen
        throw (
          err.response?.data || {
            message: "Terjadi kesalahan pada server",
          }
        );
      }
    },
  },
});
