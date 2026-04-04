<template>
  <header class="flex items-start justify-between mb-12">
    <div class="space-y-4">
      <VBreadcrumb :items="breadcrumbItems" />
      <div class="flex items-center gap-4">
        <div
          class="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-white/5 flex items-center justify-center shadow-inner">
          <icon name="ph:user-focus-duotone" class="text-indigo-400 text-3xl" />
        </div>
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-white">{{ title }}</h1>
          <p class="text-xs text-gray-500 font-medium">{{ subtitle }}</p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <VButton variant="secondary" size="md" class="!rounded-xl flex items-center gap-2">
        <icon name="ph:folder-plus-bold" size="18" />
        <span>New Folder</span>
      </VButton>
      <VButton variant="gradient" size="md" class="!rounded-xl flex items-center gap-2">
        <icon name="ph:cloud-arrow-up-bold" size="18" />
        <span>Upload</span>
      </VButton>
    </div>
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