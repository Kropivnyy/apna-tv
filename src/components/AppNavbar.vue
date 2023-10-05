<template>
  <header class="app-navbar">
    <div class="app-navbar__container container">
      <nav class="app-navbar__navigation">
        <ul class="app-navbar__nav-list">
          <li
            v-for="(link, index) in NAVIGATION"
            :key="index"
            class="app-navbar__nav-list-item"
          >
            <a :href="link.href">{{ $t(link.textKey) }}</a>
          </li>
        </ul>
      </nav>

      <a class="app-navbar__logo" href="#">
        <SvgIcon class="app-navbar__logo-icon" :name="ICON_NAMES.logo" />
      </a>

      <div class="app-navbar__toolbar">
        <ul class="app-navbar__toolbar-icons-list">
          <li class="app-navbar__toolbar-icons-item">
            <SvgIcon
              class="app-navbar__toolbar-icon"
              :name="ICON_NAMES.search"
            />
          </li>
          <li class="app-navbar__toolbar-icons-item">
            <SvgIcon
              class="app-navbar__toolbar-icon app-navbar__toolbar-icon--bell"
              :name="ICON_NAMES.bell"
            />
          </li>
        </ul>
        <a class="app-navbar__sign-up-link" href="#">{{
          $t('app-navbar.sign-up-link')
        }}</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon.vue'
import { NAVIGATION } from '@/data'
import { ICON_NAMES } from '@/const'
</script>

<style lang="scss" scoped>
.app-navbar {
  height: var(--app-navbar-height);
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.app-navbar__container {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: to-rem(20);
  letter-spacing: to-rem(0.6);
}

.app-navbar__nav-list,
.app-navbar__toolbar,
.app-navbar__toolbar-icons-list {
  display: flex;
  align-items: center;
}

.app-navbar__nav-list-item {
  transition: color var(--hover-transition);

  &:not(:last-child) {
    margin-right: to-rem(40);
  }

  @include hover {
    color: var(--col-primary-accent);
  }
}

.app-navbar__logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: to-rem(30);
  width: to-rem(136);
}

.app-navbar__logo-icon {
  height: 100%;
  width: 100%;
}

.app-navbar__toolbar-icons-item {
  margin-right: to-rem(32);
  cursor: pointer;
  transition: color var(--hover-transition);

  @include hover {
    color: var(--col-primary-accent);
  }
}

.app-navbar__toolbar-icon {
  height: to-rem(24);
  width: to-rem(24);

  &--bell {
    height: to-rem(21);
    width: to-rem(21);
  }
}

.app-navbar__sign-up-link {
  transition: color var(--hover-transition);

  @include hover {
    color: var(--col-primary-accent);
  }
}
</style>
