<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-circle-fill me-2" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
        </svg>
        <span class="fw-bold">VueVideo</span>
      </router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">
              <i class="bi bi-house-door me-1"></i> Home
            </router-link>
          </li>
          <li v-if="auth.isAuthenticated" class="nav-item">
            <router-link to="/videos" class="nav-link" active-class="active">
              <i class="bi bi-collection-play me-1"></i> My Videos
            </router-link>
          </li>
        </ul>
        
        <div class="d-flex align-items-center">
          <div v-if="auth.isAuthenticated" class="me-3 text-light">
            Welcome, {{ auth.user?.name || auth.user?.data.name || 'User' }}
            
          </div>
          
          <div class="dropdown">
            <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
              <i class="bi bi-person-circle me-1"></i>
              {{ auth.isAuthenticated ? 'Account' : 'Menu' }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <template v-if="!auth.isAuthenticated">
                <li>
                  <router-link to="/login" class="dropdown-item">
                    <i class="bi bi-box-arrow-in-right me-2"></i> Login
                  </router-link>
                </li>
                <li>
                  <router-link to="/register" class="dropdown-item">
                    <i class="bi bi-person-plus me-2"></i> Register
                  </router-link>
                </li>
              </template>
              <template v-else>
                <li>
                  <router-link to="/profile" class="dropdown-item">
                    <i class="bi bi-person me-2"></i> Profile
                  </router-link>
                </li>
                <li>
                  <router-link to="/settings" class="dropdown-item">
                    <i class="bi bi-gear me-2"></i> Settings
                  </router-link>
                </li>
              </template>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a v-if="auth.isAuthenticated" href="#" class="dropdown-item text-danger" @click="auth.logout">
                  <i class="bi bi-box-arrow-right me-2"></i> Logout
                </a>
                <a v-else href="#" class="dropdown-item">
                  <i class="bi bi-info-circle me-2"></i> About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';

const auth = useAuthStore();
</script>

<style scoped src="@/assets/styles/app.css" lang="scss"></style>