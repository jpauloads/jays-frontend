import axios from "axios";

export const api = axios.create({
    // baseURL: 'http://jays.ddns.net:4001'
    baseURL: 'https://jays-api.onrender.com'
})