<template>
  <div class="flex flex-col gap-2 mb-8">
    <VBreadcrumb :items="breadcrumbItems" />

    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <h1 class="text-3xl font-bold text-white">{{ currentTitle }}</h1>

      <div class="flex flex-wrap items-center gap-3">
        <VSearchInput v-model="filterQuery" wrapper-class="w-full sm:w-64" placeholder="Filter current view…"
          input-class="!bg-[#121214] !border-white/5 focus:!ring-1 focus:!ring-indigo-500/30"
          aria-label="Filter current view" />

        <VButton variant="ghost" size="sm" class="!bg-[#121214] !border-white/5 !px-4 !py-2 hover:!bg-white/5">
          Name
          <icon name="ph:arrow-up-bold" size="14" />
        </VButton>

        <VButton variant="secondary" size="sm" class="!px-4 !py-2" @click="emit('new-folder')">
          <icon name="ph:folder-plus-bold" size="14" class="me-1" />
          Folder
        </VButton>

        <VButton size="sm" class="!px-4 !py-2" @click="emit('upload')">
          <icon name="ph:upload-simple-bold" size="14" class="me-1" />
          Upload
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '~/types/shared-components/breadcrumb'

const emit = defineEmits(['upload', 'new-folder'])

const props = defineProps<{
  title?: string
  /** Override default Home → title trail */
  breadcrumbs?: BreadcrumbItem[]
}>()

const filterQuery = defineModel<string>('filterQuery', { default: '' })

const currentTitle = computed(() => props.title ?? 'My Files')

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  if (props.breadcrumbs?.length) return props.breadcrumbs
  return [
    { label: 'Home', to: '/dashboard' },
    { label: currentTitle.value },
  ]
})
</script>