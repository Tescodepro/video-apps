<template>
  <div class="login-container">
    <div class="row justify-content-center align-items-center min-vh-100">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-lg">
          <div class="card-body p-5">
            <!-- Logo Header -->
            <div class="text-center mb-4">
              <router-link to="/" class="text-decoration-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#0d6efd"
                  class="bi bi-play-circle-fill mb-3" viewBox="0 0 16 16">
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                </svg>
                <h2 class="h3 mb-0 fw-bold text-primary">VueVideo</h2>
                <p class="text-muted">Sign in to your account</p>
              </router-link>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="handleLogin">
              <!-- Email Input -->
              <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-envelope-fill"></i>
                  </span>
                  <input v-model="email" type="email" class="form-control" id="email" placeholder="name@example.com"
                    required>
                </div>
              </div>

              <!-- Password Input -->
              <div class="mb-4">
                <label for="password" class="form-label">Password</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-lock-fill"></i>
                  </span>
                  <input v-model="password" type="password" class="form-control" id="password" placeholder="••••••••"
                    required>
                  <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
                    <i :class="showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i>
                  </button>
                </div>
                <div class="form-text text-end">
                  <router-link to="/forgot-password" class="text-decoration-none">Forgot password?</router-link>
                </div>
              </div>

              <button class="btn btn-primary w-100 py-2 mb-3" type="submit" :disabled="loading">
                <span v-if="loading">
                  <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                  <span role="status">Signing in...</span>
                </span>
                <span v-else>
                  <i class="bi bi-box-arrow-in-right me-2"></i>
                  Sign in
                </span>
              </button>

              <!-- Message Alert -->
              <div v-if="message" class="alert" :class="messageType" role="alert">
                <i :class="messageIcon"></i> {{ message }}
              </div>
            </form>

            <!-- Registration Link -->
            <div class="text-center mt-4">
              <p class="text-muted mb-0">Don't have an account?
                <router-link to="/register" class="text-decoration-none fw-bold">Sign up</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const loading = ref(false);
const message = ref('');
const showPassword = ref(false);

const messageType = computed(() => {
  return message.value.includes('success') ? 'alert-success' : 'alert-danger';
});

const messageIcon = computed(() => {
  return message.value.includes('success') ? 'bi bi-check-circle-fill me-2' : 'bi bi-exclamation-triangle-fill me-2';
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  loading.value = true;
  message.value = '';

  try {
    const success = await authStore.login(email.value, password.value);
    
    if (success) {
      message.value = 'Login successful! Redirecting...';
      messageType.value = 'alert-success';
      
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  } catch (err) {
    message.value = err.message || 'Login failed. Please check your credentials.';
    messageType.value = 'alert-danger';
  } finally {
    loading.value = false;
  }

  
};
</script>

<style scoped>
.login-container {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 0px;
}

.card {
  border: none;
  border-radius: 12px;
  overflow: hidden;
}

.social-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider-line {
  position: relative;
  margin: 1.5rem 0;
}

.divider-line::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #dee2e6;
  z-index: -1;
}

.divider-line p {
  display: inline-block;
  background-color: white;
  padding: 0 10px;
}

.input-group-text {
  background-color: #f8f9fa;
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1);
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .card {
    border-radius: 0;
  }
}
</style>