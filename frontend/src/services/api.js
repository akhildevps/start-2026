import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Heroes API
export const heroAPI = {
    getAll: () => apiClient.get('/heroes'),
    getById: (id) => apiClient.get(`/heroes/${id}`),
    create: (data) => apiClient.post('/heroes', data),
    update: (id, data) => apiClient.put(`/heroes/${id}`, data),
    delete: (id) => apiClient.delete(`/heroes/${id}`),
    toggleVisibility: (id) => apiClient.patch(`/heroes/${id}/toggle`),
};

// Features API
export const featureAPI = {
    getAll: () => apiClient.get('/features'),
    getById: (id) => apiClient.get(`/features/${id}`),
    create: (data) => apiClient.post('/features', data),
    update: (id, data) => apiClient.put(`/features/${id}`, data),
    delete: (id) => apiClient.delete(`/features/${id}`),
    toggleVisibility: (id) => apiClient.patch(`/features/${id}/toggle`),
};

// Accommodations API
export const accommodationAPI = {
    getAll: () => apiClient.get('/accommodations'),
    getById: (id) => apiClient.get(`/accommodations/${id}`),
    create: (data) => apiClient.post('/accommodations', data),
    update: (id, data) => apiClient.put(`/accommodations/${id}`, data),
    delete: (id) => apiClient.delete(`/accommodations/${id}`),
    toggleVisibility: (id) => apiClient.patch(`/accommodations/${id}/toggle`),
};

// Amenities API
export const amenityAPI = {
    getAll: () => apiClient.get('/amenities'),
    getById: (id) => apiClient.get(`/amenities/${id}`),
    create: (data) => apiClient.post('/amenities', data),
    update: (id, data) => apiClient.put(`/amenities/${id}`, data),
    delete: (id) => apiClient.delete(`/amenities/${id}`),
    toggleVisibility: (id) => apiClient.patch(`/amenities/${id}/toggle`),
};

// Bookings API
export const bookingAPI = {
    getAll: () => apiClient.get('/bookings'),
    getById: (id) => apiClient.get(`/bookings/${id}`),
    create: (data) => apiClient.post('/bookings', data),
    update: (id, data) => apiClient.put(`/bookings/${id}`, data),
    delete: (id) => apiClient.delete(`/bookings/${id}`),
    toggleVisibility: (id) => apiClient.patch(`/bookings/${id}/toggle`),
};

// Footers API
export const footerAPI = {
    getAll: () => apiClient.get('/footers'),
    getById: (id) => apiClient.get(`/footers/${id}`),
    create: (data) => apiClient.post('/footers', data),
    update: (id, data) => apiClient.put(`/footers/${id}`, data),
    delete: (id) => apiClient.delete(`/footers/${id}`),
    toggleVisibility: (id) => apiClient.patch(`/footers/${id}/toggle`),
};

// Sections API
export const sectionAPI = {
    getAll: () => apiClient.get('/sections'),
    getByName: (name) => apiClient.get(`/sections/name/${name}`),
    setVisibility: (data) => apiClient.post('/sections', data),
    // Items (slides) CRUD for a named section
    createItem: (name, data) => apiClient.post(`/sections/name/${name}/items`, data),
    updateItem: (name, itemId, data) => apiClient.put(`/sections/name/${name}/items/${itemId}`, data),
    deleteItem: (name, itemId) => apiClient.delete(`/sections/name/${name}/items/${itemId}`),
};

// Master Config API
export const masterConfigAPI = {
    get: () => apiClient.get('/config'),
    update: (data) => apiClient.put('/config', data),
    updateSection: (sectionName, data) => apiClient.put(`/config/sections/${sectionName}`, data),
};

// Upload API - Create separate axios instance for file uploads (no JSON headers)
const uploadClient = axios.create({
    baseURL: API_BASE_URL,
});

export const uploadAPI = {
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        
        // Don't set Content-Type header, let browser handle it with boundary
        return uploadClient.post('/upload', formData);
    },
};

export default apiClient;
