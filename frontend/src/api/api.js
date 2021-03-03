import axios from "axios";

export const instance = axios.create({
    // withCredentials: true,
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const setToken = (token) => {
    instance.defaults.headers['Authorization'] = `Token ${token}`;
};