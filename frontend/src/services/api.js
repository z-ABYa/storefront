import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/store/';
const AUTH_BASE_URL = import.meta.env.VITE_AUTH_URL || 'http://localhost:8000/auth/';

// Create axios instances
export const storeAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
storeAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});

authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh
const handleTokenRefresh = async (error) => {
  const originalRequest = error.config;
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        const response = await authAPI.post('jwt/refresh/', { refresh: refreshToken });
        localStorage.setItem('access_token', response.data.access);
        originalRequest.headers.Authorization = `JWT ${response.data.access}`;
        return storeAPI(originalRequest);
      } catch (err) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
  }
  return Promise.reject(error);
};

storeAPI.interceptors.response.use((response) => response, handleTokenRefresh);
authAPI.interceptors.response.use((response) => response, handleTokenRefresh);

// Products API
export const productsAPI = {
  getAll: (params) => storeAPI.get('products/', { params }),
  getById: (id) => storeAPI.get(`products/${id}/`),
  create: (data) => storeAPI.post('products/', data),
  update: (id, data) => storeAPI.put(`products/${id}/`, data),
  delete: (id) => storeAPI.delete(`products/${id}/`),
};

// Collections API
export const collectionsAPI = {
  getAll: () => storeAPI.get('collections/'),
  getById: (id) => storeAPI.get(`collections/${id}/`),
  create: (data) => storeAPI.post('collections/', data),
  update: (id, data) => storeAPI.put(`collections/${id}/`, data),
  delete: (id) => storeAPI.delete(`collections/${id}/`),
};

// Products Images API
export const productImagesAPI = {
  create: (productId, data) => storeAPI.post(`products/${productId}/images/`, data),
  delete: (productId, imageId) => storeAPI.delete(`products/${productId}/images/${imageId}/`),
};

// Reviews API
export const reviewsAPI = {
  getAll: (productId, params) => storeAPI.get(`products/${productId}/reviews/`, { params }),
  create: (productId, data) => storeAPI.post(`products/${productId}/reviews/`, data),
};

// Cart API
export const cartAPI = {
  create: () => storeAPI.post('carts/'),
  get: (cartId) => storeAPI.get(`carts/${cartId}/`),
  delete: (cartId) => storeAPI.delete(`carts/${cartId}/`),
};

// Cart Items API
export const cartItemsAPI = {
  getAll: (cartId) => storeAPI.get(`carts/${cartId}/items/`),
  add: (cartId, data) => storeAPI.post(`carts/${cartId}/items/`, data),
  update: (cartId, itemId, data) => storeAPI.patch(`carts/${cartId}/items/${itemId}/`, data),
  delete: (cartId, itemId) => storeAPI.delete(`carts/${cartId}/items/${itemId}/`),
};

// Orders API
export const ordersAPI = {
  getAll: (params) => storeAPI.get('orders/', { params }),
  getById: (id) => storeAPI.get(`orders/${id}/`),
  create: (data) => storeAPI.post('orders/', data),
  update: (id, data) => storeAPI.patch(`orders/${id}/`, data),
  delete: (id) => storeAPI.delete(`orders/${id}/`),
};

// Customers API
export const customersAPI = {
  getAll: () => storeAPI.get('customers/'),
  getMe: () => storeAPI.get('customers/me/'),
  updateMe: (data) => storeAPI.put('customers/me/', data),
};

// Authentication API
export const authenticationAPI = {
  register: (data) => authAPI.post('users/', data),
  login: (username, password) => authAPI.post('jwt/create/', { username, password }),
  refreshToken: (refresh) => authAPI.post('jwt/refresh/', { refresh }),
  getMe: () => authAPI.get('users/me/'),
};


export default storeAPI;
