<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup>
import { ICON_NAMES } from '@/const'

defineProps({
  name: {
    type: String,
    validator(value) {
      return Object.keys(ICON_NAMES).includes(value)
    },
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.svg-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
</style>
