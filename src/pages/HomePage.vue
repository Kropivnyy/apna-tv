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
      <swiper
        class="home-page__movies-list"
        slides-per-view="auto"
        space-between="32"
        :free-mode="true"
        :breakpoints="{
          '1024': {
            enabled: false,
            spaceBetween: 0,
          },
        }"
        :modules="swiperModules"
        tag="ul"
      >
        <swiper-slide
          v-for="movie in MOVIES_DATA"
          :key="movie.id"
          tag="li"
          class="home-page__movie-item"
          :class="{
            'home-page__movie-item--active': movie.id === movieActiveId,
          }"
        >
          <button
            class="home-page__movie-item-btn"
            type="button"
            @click="onClickMovie(movie.id)"
          >
            <img
              class="home-page__movie-poster"
              :src="movie.preview"
              height="256"
              width="182"
              :alt="`${$t(movie.titleKey)} poster`"
              loading="lazy"
            />
          </button>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup>
import 'swiper/css'
import 'swiper/css/free-mode'

import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode } from 'swiper/modules'

import { MOVIES_DATA } from '@/data'

import MovieDetails from '@/components/MovieDetails.vue'

const swiperModules = [FreeMode]

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
  --movies-list-shift: #{to-rem(50)};

  width: calc(100% + var(--movies-list-shift) * 2);
  margin: 0 calc(var(--movies-list-shift) * -1);
  padding: to-rem(12) var(--movies-list-shift);
  background-color: var(--home-page-movies-list-bg);
  border: to-rem(1) solid var(--home-page-movies-list-border-color);
  border-radius: to-rem(24);
  backdrop-filter: blur(to-rem(10));
  overflow: visible;
  user-select: none;

  @include respond-above(medium) {
    --movies-list-shift: #{to-rem(11)};

    padding: to-rem(12) to-rem(16);
  }
}

.home-page__movie-item {
  aspect-ratio: 0.72;
  height: 26svh;
  width: unset;
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

  @include respond-above(medium) {
    width: 100%;
  }

  &--active {
    transform: scale(1.2);
    border-color: var(--home-page-active-movie-border-color);
    border-radius: to-rem(24);

    @include respond-above(medium) {
      transform: scale(1.3);
    }

    @include hover {
      transform: scale(1.2);

      @include respond-above(medium) {
        transform: scale(1.3);
      }
    }
  }
}

.home-page__movie-item-btn {
  width: 100%;
}

.home-page__movie-poster {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>

<style lang="scss">
.home-page .swiper-wrapper {
  @include respond-above(medium) {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: to-rem(30);
    justify-content: space-between;
  }
}
</style>
