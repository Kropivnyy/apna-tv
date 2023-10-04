<template>
  <AppNavbar />

  <main class="application">
    <HomePage />
  </main>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue';
import HomePage from '@/pages/HomePage.vue';
</script>


<style lang="scss" scoped>
.application {
  padding-top: 100px;
}
</style>
