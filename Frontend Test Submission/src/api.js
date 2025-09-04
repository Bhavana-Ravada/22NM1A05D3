import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const createShortUrl = (data) => API.post("/shorturls", data);
export const getStats = (shortcode) => API.get(`/shorturls/stats/${shortcode}`);
