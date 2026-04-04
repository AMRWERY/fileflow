<template>
  <div class="flex flex-col items-center justify-center py-24 gap-3 text-center">
    <div class="p-4 rounded-3xl bg-white/[0.03] border border-white/[0.05] mb-2">
      <Icon :name="icon" :size="iconSize" class="text-gray-600" />
    </div>
    <h3 v-if="title" class="text-sm font-semibold text-gray-400 tracking-tight">
      {{ title }}
    </h3>
    <p v-if="description" class="max-w-[280px] text-[13px] leading-relaxed text-gray-500">
      {{ description }}
    </p>
    <div v-if="$slots.actions" class="mt-4">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EmptyStateProps } from '@/types/shared-components/empty-state'

withDefaults(defineProps<EmptyStateProps>(), {
  icon: 'ph:folder-open-duotone',
  iconSize: '48',
})
</script>