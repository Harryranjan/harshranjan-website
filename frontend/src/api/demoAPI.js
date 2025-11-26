import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Demo Lead Capture API
export const demoAPI = {
  // Capture lead from any demo
  captureLead: async (leadData) => {
    try {
      const response = await api.post("/leads", leadData);
      return response.data;
    } catch (error) {
      console.error("Lead capture error:", error);
      throw error;
    }
  },
};

export default demoAPI;
