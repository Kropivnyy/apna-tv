<template>
  <AppNavbar />

  <main class="application">
    <h1 class="visually-hidden">{{ $t('app.title') }}</h1>
    <HomePage />
  </main>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import HomePage from '@/pages/HomePage.vue'
</script>
