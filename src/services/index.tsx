import axios from "axios";

const api = axios.create({
  baseURL: "https://hamburgueria-ts-drab.vercel.app/home",
});

export default api;
