import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Articles
export const getArticles = () => api.get('/Articles');
export const getArticle = (id) => api.get(`/Articles/${id}`);
export const createArticle = (data) => api.post('/Articles', data);
export const updateArticle = (id, data) => api.put(`/Articles/${id}`, data);
export const deleteArticle = (id) => api.delete(`/Articles/${id}`);

// Clients
export const getClients = () => api.get('/Clients');
export const createClient = (data) => api.post('/Clients', data);
export const updateClient = (id, data) => api.put(`/Clients/${id}`, data);

// Inventory
export const getInventory = (articleId) => api.get(`/ArticleInventory/${articleId}`);
export const addToWarehouse = (params) => api.post('/ArticleInventory/AddToWarehouse', null, { params });
export const moveStock = (data) => api.post('/ArticleInventory/MoveStock', data);

// Users
export const getUsers = () => api.get('/Users');
export const getUser = (id) => api.get(`/Users/${id}`);
export const createUser = (data) => api.post('/Users', data);
export const updateUser = (id, data) => api.put(`/Users/${id}`, data);
export const deleteUser = (id) => api.delete(`/Users/${id}`);

export default api;
