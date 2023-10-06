<template>
  <div class="movie-details">
    <h2 class="movie-details__title">{{ $t(movie.titleKey) }}</h2>
    <h3 v-if="movie.subtitleKey" class="movie-details__subtitle">
      {{ $t(movie.subtitleKey) }}
    </h3>
    <p class="movie-details__description">{{ $t(movie.descriptionKey) }}</p>

    <RatingIcon class="movie-details__rating" :rating="movie.rating" />

    <ul class="movie-details__cta-list">
      <li class="movie-details__cta-item">
        <AppButton
          :text="$t('movie-details.watch-btn')"
          size="large"
          href="https://www.youtube.com/"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <template #iconLeft>
            <PlayIcon />
          </template>
        </AppButton>
      </li>
      <li class="movie-details__cta-item">
        <AppButton
          scheme="outlined"
          :text="$t('movie-details.trailer-btn')"
          href="https://www.youtube.com/"
          target="_blank"
          rel="nofollow noopener noreferrer"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import RatingIcon from '@/components/icons/RatingIcon.vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'

defineProps({
  movie: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.movie-details__title {
  margin-bottom: -0.25em;
  text-transform: uppercase;
}

.movie-details__subtitle {
  margin-bottom: 0.5svh;
  text-transform: uppercase;
}

.movie-details__description {
  max-width: to-rem(520);
  margin-bottom: 2svh;
  opacity: 0.9;
  font-size: clamp(to-rem(14), 1.7svh, var(--p-size));
}

.movie-details__rating {
  margin-bottom: 3.1svh;
}

.movie-details__cta-list {
  display: flex;
  align-items: center;
}

.movie-details__cta-item {
  &:not(:last-child) {
    margin-right: to-rem(24);
  }
}
</style>
