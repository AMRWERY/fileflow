<template>
  <nav v-if="items.length"
    class="flex items-center flex-wrap gap-x-2 gap-y-1 text-[10px] tracking-widest font-bold text-gray-600"
    aria-label="Breadcrumb">
    <template v-for="(item, index) in items" :key="`${index}-${item.label}`">
      <nuxt-link v-if="item.to" :to="item.to" class="hover:text-gray-400 transition-colors shrink-0">
        {{ item.label }}
      </nuxt-link>
      <span v-else class="text-gray-400 shrink-0">{{ item.label }}</span>
      <icon v-if="index < items.length - 1" name="ph:caret-right-bold" size="10" class="shrink-0 opacity-80" />
    </template>
  </nav>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '~/types/shared-components/breadcrumb'

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>