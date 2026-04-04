<template>
  <div :class="[
    'bg-[#121214] border border-white/[0.05] rounded-[24px] shadow-2xl',
    paddingClass,
  ]">
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  padding?: 'none' | 'sm' | 'md' | 'lg'
}>()

const paddingClass = computed(() => {
  switch (props.padding) {
    case 'none':
      return ''
    case 'sm':
      return 'p-5 md:p-6'
    case 'lg':
      return 'p-10 md:p-12'
    default:
      return 'p-8 md:p-10'
  }
})
</script>