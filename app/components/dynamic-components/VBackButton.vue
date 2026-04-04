<template>
  <button type="button"
    class="p-2 hover:bg-white/5 rounded-lg transition-all active:scale-95 text-gray-400 hover:text-white flex items-center justify-center"
    @click="handleClick" :title="label || 'Back'">
    <icon name="ph:arrow-left-bold" :size="size ?? 18" />
    <span v-if="label" class="ms-2 text-sm font-bold tracking-tight">{{ label }}</span>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps<{
  /** Optional destination route. If not provided, uses browser history back. */
  to?: string
  /** Optional text label to show next to the icon. */
  label?: string
  /** Icon size (defaults to 18). */
  size?: number | string
}>()

const router = useRouter()

const handleClick = () => {
  if (props.to) {
    return navigateTo(props.to)
  }
  router.back()
}
</script>