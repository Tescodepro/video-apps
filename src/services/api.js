import axios from 'axios';

const api = axios.create({
  baseURL: 'https://video-app.cortia.com.ng/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // withCredentials: true // Only enable if backend supports credentials
});

export default api;