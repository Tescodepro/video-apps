<script setup>
import { ref } from 'vue'
import api from '../services/api'

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const message = ref('')

const handleRegister = async () => {
  loading.value = true
  try {
    const res = await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    message.value = 'Registration successful!'
    console.log(res.data)
  } catch (err) {
    message.value = err.response?.data?.message || 'Registration failed.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="name" placeholder="Name" />
      <input v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button :disabled="loading">Register</button>
    </form>
    <p>{{ message }}</p>
  </div>
</template>
