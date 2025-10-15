import axios from "axios";

const axiosInstance = axios.create({
  // Menggunakan environment variable untuk baseURL, dengan fallback ke URL lokal
  baseURL: import.meta.env.VITE_API_URL || "https://cms-aptiknas.hexagon.co.id/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
