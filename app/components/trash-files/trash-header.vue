<template>
  <header class="mb-12">
    <div v-if="breadcrumbItems.length">
      <VBreadcrumb :items="breadcrumbItems" class="mb-6" />
    </div>
    <h1 class="text-4xl font-bold mb-3 tracking-tight text-white">{{ title }}</h1>
    <p class="text-gray-500 font-medium text-lg leading-relaxed">{{ subtitle }}</p>
  </header>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '~/types/shared-components/breadcrumb'

defineProps<{
  title: string
  subtitle: string
  breadcrumbItems: BreadcrumbItem[]
}>()
</script>