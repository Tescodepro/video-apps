import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  
  // Initialize state
  const user = ref(null);
  const token = ref(null);
  const isAuthenticated = ref(false);

  // Load auth state from localStorage
  const loadAuthState = () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        token.value = storedToken;
        user.value = JSON.parse(storedUser);
        isAuthenticated.value = true;
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      clearAuthState();
    }
  };

  // Clear auth state
  const clearAuthState = () => {
    user.value = null;
    token.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  };

  // Login method
  const login = async (email, password) => {
    try {
      const response = await api.post('auth/login', { email, password });
      
      if (response.data.status && response.data.data) {
        // Store the received data
        token.value = response.data.data.token;
        user.value = response.data.data.user;
        isAuthenticated.value = true;
        
        // Persist to localStorage
        localStorage.setItem('authToken', token.value);
        localStorage.setItem('user', JSON.stringify(user.value));
        
        console.log('Login successful - User:', user.value);
        return true;
      }
      throw new Error(response.data.message || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      clearAuthState();
      throw error;
    }
  };

  // Logout method
  const logout = () => {
    clearAuthState();
    router.push('/login');
  };

  // Initialize auth state when store is created
  loadAuthState();

  return { 
    user,
    token,
    isAuthenticated,
    login,
    logout,
    loadAuthState
  };
});