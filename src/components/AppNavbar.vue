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
        <LogoIcon />
      </a>

      <div class="app-navbar__toolbar">
        <ul class="app-navbar__toolbar-icons-list">
          <li class="app-navbar__toolbar-icons-item">
            <SearchIcon />
          </li>
          <li class="app-navbar__toolbar-icons-item">
            <BellIcon />
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
import LogoIcon from '@/components/icons/LogoIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import BellIcon from '@/components/icons/BellIcon.vue'
import { NAVIGATION } from '@/data'
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
    color: var(--col-primary-accent-main);
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

.app-navbar__toolbar-icons-item {
  display: flex;
  margin-right: to-rem(32);
  cursor: pointer;
  transition: color var(--hover-transition);

  @include hover {
    color: var(--col-primary-accent-main);
  }
}

.app-navbar__sign-up-link {
  transition: color var(--hover-transition);

  @include hover {
    color: var(--col-primary-accent-main);
  }
}
</style>
