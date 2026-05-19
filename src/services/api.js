import axios from 'axios';

// const api = axios.create({
//   baseURL: `${import.meta.env.VITE_API_URL || 'https://new-backend-job-portal.onrender.com'}`,
// });

// Get the raw URL and safely remove any accidental trailing slash
const rawBaseUrl = import.meta.env.VITE_API_URL || 'https://new-backend-job-portal.onrender.com';
const sanitizedBaseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

const api = axios.create({
  baseURL: `${sanitizedBaseUrl}/api`,
  withCredentials: true // Crucial to match 'setAllowCredentials(true)' in Spring Boot
});

api.interceptors.request.use((config) => {
 const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
