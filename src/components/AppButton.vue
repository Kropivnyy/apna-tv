<template>
  <template v-if="href">
    <a class="app-button" :class="buttonClasses" v-bind="$attrs" :href="href">
      <div v-if="$slots.iconLeft" class="app-button__icon-left">
        <slot name="iconLeft" />
      </div>
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <span v-if="text" class="app-button__text">
          {{ text }}
        </span>
      </template>
    </a>
  </template>
  <template v-else>
    <button
      class="app-button"
      :class="buttonClasses"
      v-bind="$attrs"
      :disabled="isDisabled"
      :type="buttonType"
    >
      <div v-if="$slots.iconLeft" class="app-button__icon-left">
        <slot name="iconLeft" />
      </div>
      <template v-if="$slots.default">
        <slot />
      </template>
      <template v-else>
        <span v-if="text" class="app-button__text">
          {{ text }}
        </span>
      </template>
    </button>
  </template>
</template>

<script setup>
import { computed, useAttrs, useSlots } from 'vue'

const props = defineProps({
  text: String,
  scheme: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'outlined'].includes(value)
    },
  },
  size: {
    type: String,
    default: 'medium',
    validator(value) {
      return ['large', 'medium'].includes(value)
    },
  },
  href: String,
})

const attrs = useAttrs()
const slots = useSlots()

const isDisabled = computed(() =>
  ['', 'disabled', true].includes(attrs.disabled),
)

const buttonClasses = computed(() =>
  [
    'app-button',
    `app-button--scheme-${props.scheme}`,
    `app-button--${props.size}`,
    ...(isDisabled.value ? ['app-button--disabled'] : []),
    ...((props.iconLeft || props.iconRight) && !props.text && !slots.default
      ? ['app-button--icon-only']
      : []),
  ].join(' '),
)

const buttonType = computed(() => attrs.type || 'button')
</script>

<style lang="scss" scoped>
.app-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-grow: 1;
  color: var(--primary-text-color);
  background-color: transparent;
  border-radius: to-rem(41);
  font-size: var(--p-size);
  font-weight: 600;
  letter-spacing: to-rem(0.72);
  user-select: none;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: var(--medium-transition-duration);
  transition-timing-function: var(--hover-transition-timing-function);
}

.app-button--scheme-primary {
  background-color: var(--col-primary-accent-main);

  @include mobile-hover {
    &:not(:disabled) {
      color: var(--primary-text-color);
    }
  }

  @include hover {
    &:not(:disabled) {
      background-color: var(--col-primary-accent-main-dark);
      color: var(--primary-text-color);
    }
  }
}

.app-button--scheme-outlined {
  border: #{to-rem(1)} solid var(--col-total-white);

  @include mobile-hover {
    &:not(:disabled) {
      color: var(--primary-text-color);
    }
  }

  @include hover {
    &:not(:disabled) {
      background-color: var(--col-white-min-alpha);
      color: var(--primary-text-color);
    }
  }
}

.app-button--medium {
  min-height: to-rem(42);
  min-width: to-rem(100);
  padding: 0 to-rem(16);

  @include respond-above(medium) {
    min-height: to-rem(48);
    min-width: to-rem(120);
  }
}

.app-button--large {
  min-height: to-rem(48);
  min-width: to-rem(160);
  padding: 0 to-rem(22);
}

.app-button__icon-left {
  display: flex;
  margin-right: to-rem(12);
}
</style>
