<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />

    <main class="flex-1 p-4">
      <router-view />
    </main>

    <Footer/>
  </div>
</template>

<script setup>
import NavBar from './components/layout/NavBar.vue'
import Footer from './components/layout/Footer.vue'
</script>
