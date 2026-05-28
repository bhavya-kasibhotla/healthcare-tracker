import axios from "axios";

const API = axios.create({
  baseURL: "https://healthcare-tracker-jtaz.onrender.com",
});

export default API;