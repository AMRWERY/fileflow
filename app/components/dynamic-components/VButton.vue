<template>
  <button :type="type ?? 'button'" :disabled="disabled || loading" :class="[
    'inline-flex items-center justify-center gap-2 font-semibold transition-all active:scale-[0.98]',
    fullWidth ? 'w-full' : '',
    variantClasses,
    sizeClasses,
    disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
  ]">
    <svg v-if="loading" class="animate-spin h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <slot />
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  variant?: 'primary' | 'gradient' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'gradient':
      return 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl shadow-lg shadow-indigo-900/20 border border-white/10'
    case 'secondary':
      return 'border border-white/10 hover:bg-white/5 hover:border-white/20 text-white rounded-xl'
    case 'ghost':
      return 'bg-[#1c1c1f] border border-white/5 hover:bg-[#252529] text-white rounded-xl'
    default:
      return 'bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-900/20'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-xs'
    case 'lg':
      return 'px-6 py-4 text-base'
    default:
      return 'px-5 py-3 text-sm'
  }
})
</script>