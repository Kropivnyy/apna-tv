<template>
  <AppNavbar />

  <h1 class="visually-hidden">{{ $t('app.title') }}</h1>
  <main class="application">
    <HomePage />
  </main>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue'
import HomePage from '@/pages/HomePage.vue'
</script>
