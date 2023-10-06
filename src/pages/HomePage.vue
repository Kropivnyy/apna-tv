<template>
  <section
    class="home-page"
    :style="{
      backgroundImage: `var(--home-page-bg-gradient), url(${activeMovie.poster})`,
    }"
  >
    <div class="home-page__container container">
      <Transition name="fade" mode="out-in" appear>
        <MovieDetails
          class="home-page__movie-details"
          :key="movieActiveId"
          :movie="activeMovie"
        />
      </Transition>
      <div class="home-page__category-title">
        {{ $t('home-page.popular-movies-title') }}
      </div>
      <ul class="home-page__movies-list">
        <li
          v-for="movie in MOVIES_DATA"
          :key="movie.id"
          class="home-page__movie-item"
          :class="{
            'home-page__movie-item--active': movie.id === movieActiveId,
          }"
        >
          <button type="button" @click="onClickMovie(movie.id)">
            <img
              class="home-page__movie-poster"
              :src="movie.preview"
              height="256"
              width="182"
              :alt="`${$t(movie.titleKey)} poster`"
              loading="lazy"
            />
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { MOVIES_DATA } from '@/data'

import MovieDetails from '@/components/MovieDetails.vue'

const movieActiveId = ref(2)
const activeMovie = computed(() =>
  MOVIES_DATA.find(movie => movie.id === movieActiveId.value),
)

const onClickMovie = movieId => {
  movieActiveId.value = movieId
}
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100svh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.home-page__container {
  padding-top: to-rem(140);
  padding-bottom: min(to-rem(66), 6.5svh);
}

.home-page__movie-details {
  margin-bottom: to-rem(45);
  padding-left: to-rem(32);
}

.home-page__category-title {
  margin-bottom: to-rem(33);
  font-family: var(--secondary-font-family);
  font-size: to-rem(20);
  font-weight: 700;
  letter-spacing: -0.03em;
  text-transform: capitalize;
}

.home-page__movies-list {
  --movies-list-shift: #{to-rem(11)};

  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: to-rem(24);
  height: 28svh;
  width: calc(100% + var(--movies-list-shift) * 2);
  margin: 0 calc(var(--movies-list-shift) * -1);
  padding: to-rem(12) to-rem(16);
  background-color: var(--home-page-movies-list-bg);
  border: to-rem(1) solid var(--home-page-movies-list-border-color);
  border-radius: to-rem(24);
  backdrop-filter: blur(to-rem(10));
}

.home-page__movie-item {
  display: flex;
  border-radius: to-rem(16);
  border: to-rem(4) solid transparent;
  overflow: hidden;
  transform-origin: center 65%;
  transition-property: border-color, border-radius, transform;
  transition-duration: var(--slow-transition-duration);
  transition-timing-function: var(--hover-transition-timing-function);

  @include hover {
    transform: scale(1.1);
  }

  &--active {
    transform: scale(1.35);
    border-color: var(--home-page-active-movie-border-color);
    border-radius: to-rem(24);

    @include hover {
      transform: scale(1.35);
    }
  }
}

.home-page__movie-poster {
  height: 100%;
  object-fit: cover;
}
</style>
