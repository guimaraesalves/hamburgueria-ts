import axios from "axios";

const api = axios.create({
  baseURL: "https://api-hamburgueria-mateus.herokuapp.com/",
});

export default api;
