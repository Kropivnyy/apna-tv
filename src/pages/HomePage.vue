<template>
  <section
    class="home-page"
    :style="{
      backgroundImage: `var(--home-page-bg-gradient), url(${activeMovie.poster})`,
    }"
  >
    <div class="home-page__container container">
      <div ref="movieDetailsRef" class="home-page__movie-details">
        <Transition
          name="fade"
          mode="out-in"
          appear
          @before-enter="onBeforeEnter"
        >
          <MovieDetails :key="movieActiveId" :movie="activeMovie" />
        </Transition>
      </div>
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
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { MOVIES_DATA } from '@/data'

import MovieDetails from '@/components/MovieDetails.vue'

const movieActiveId = ref(2)
const movieDetailsPrevHeight = ref(0)
const movieDetailsRef = ref(null)
const activeMovie = computed(() =>
  MOVIES_DATA.find(movie => movie.id === movieActiveId.value),
)

const onClickMovie = movieId => {
  movieActiveId.value = movieId
}

const autoHeightTransition = () => {
  const { value: targetElement } = movieDetailsRef
  console.log('first')

  if (!targetElement) return

  // remove height and transition
  targetElement.style.transition = ''
  targetElement.style.height = ''

  requestAnimationFrame(() => {
    // measure new height
    const newHeight = targetElement.scrollHeight

    // apply prev height immediately
    targetElement.style.height = movieDetailsPrevHeight.value

    requestAnimationFrame(() => {
      // add transition back
      targetElement.style.transition = 'height var(--slide-transition)'

      requestAnimationFrame(() => {
        // apply newHeight
        targetElement.style.height = newHeight + 'px'
        movieDetailsPrevHeight.value = newHeight + 'px'
      })
    })
  })
}

const onBeforeEnter = () => {
  autoHeightTransition()
}

onMounted(() => {
  // save current height
  movieDetailsPrevHeight.value = movieDetailsRef.value.scrollHeight + 'px'

  window.addEventListener('resize', autoHeightTransition)
})

onUnmounted(() => {
  window.removeEventListener('resize', autoHeightTransition)
})
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100svh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @include respond-above(medium) {
    min-height: unset;
    height: 100svh;
  }
}

.home-page__container {
  padding-top: var(--app-navbar-height);
  padding-bottom: to-rem(20);
}

.home-page__movie-details {
  margin-bottom: 4svh;

  @include respond-above(tablet) {
    padding-left: to-rem(32);
  }
}

.home-page__category-title {
  margin-bottom: 3svh;
  font-family: var(--secondary-font-family);
  font-size: to-rem(18);
  font-weight: 700;
  letter-spacing: -0.03em;
  text-transform: capitalize;

  @include respond-above(medium) {
    font-size: to-rem(20);
  }
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
  aspect-ratio: 0.72;
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
