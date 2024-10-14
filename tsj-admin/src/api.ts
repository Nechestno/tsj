import axios from 'axios';

// Создаем экземпляр axios
const $api = axios.create({
  withCredentials:true,
});

$api.interceptors.request.use((config) => {
    // Добавляем токен в заголовки
    config.headers.Authorization = `Bearer ${localStorage.getItem('jwtToken')}`;
    return config;
  }, (error) => {
    return Promise.reject(error);
});

export default $api;