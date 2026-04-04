<template>
  <div
    :class="[
      'border border-white/5 bg-[#121214]',
      variant === 'list'
        ? 'flex flex-row items-stretch gap-4 rounded-2xl p-3 sm:p-4'
        : 'rounded-[22px] p-4 flex flex-col',
    ]"
  >
    <skeleton-shimmer-block
      :class="[
        'shrink-0 rounded-xl bg-[#0a0a0c]/80',
        variant === 'list' ? 'w-28 sm:w-32 h-20 sm:h-24' : 'h-56 w-full mb-4',
      ]"
    />
    <div :class="['min-w-0 flex-1 flex flex-col justify-center gap-2', variant === 'list' ? 'pe-8' : '']">
      <skeleton-shimmer-block class="h-4 w-full max-w-[200px] rounded-md" />
      <div class="flex items-center justify-between gap-4">
        <skeleton-shimmer-block class="h-3 w-14 rounded-md" />
        <skeleton-shimmer-block class="h-3 w-20 rounded-md shrink-0" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    variant?: 'grid' | 'list'
  }>(),
  { variant: 'grid' },
)
</script>
