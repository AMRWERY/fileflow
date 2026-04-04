<template>
  <div :class="['skeleton-shimmer', blockClass]" aria-hidden="true" />
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** Tailwind classes for size / radius (e.g. h-9 w-48 rounded-lg) */
    blockClass?: string
  }>(),
  { blockClass: '' },
)
</script>

<style scoped>
.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.04) 0%,
    rgba(255, 255, 255, 0.09) 45%,
    rgba(255, 255, 255, 0.04) 90%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer-move 1.75s ease-in-out infinite;
}

@keyframes skeleton-shimmer-move {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
