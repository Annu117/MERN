import axios from 'axios';

const API = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL: 'mongodb+srv://annu21312:LsqDcwMXUaajI9ue@register.eggxwut.mongodb.net/register',

});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (userData) => {
  const { data } = await API.post('/auth/signup', userData);
  return data;
};

export const fetchPosts = async (page = 1) => {
  const { data } = await API.get('/posts', {
    params: {
      page,
    },
  });
  return data;
};

