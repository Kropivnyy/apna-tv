<template>
  <div class="movie-details">
    <h2 class="movie-details__title">{{ $t(movie.titleKey) }}</h2>
    <h3 v-if="movie.subtitleKey" class="movie-details__subtitle">
      {{ $t(movie.subtitleKey) }}
    </h3>
    <p class="movie-details__description">{{ $t(movie.descriptionKey) }}</p>
  </div>
</template>

<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.movie-details__title {
  margin-bottom: -#{to-rem(16)};
  text-transform: uppercase;
}

.movie-details__subtitle {
  margin-bottom: to-rem(6);
  text-transform: uppercase;
}

.movie-details__description {
  max-width: to-rem(520);
  margin-bottom: to-rem(23);
  opacity: 0.9;
}

.movie-details__rating {
  margin-bottom: to-rem(36);
}
</style>
