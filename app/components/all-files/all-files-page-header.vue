<template>
  <div class="flex flex-col gap-2 mb-8">
    <VBreadcrumb :items="breadcrumbItems" />

    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <h1 class="text-3xl font-bold text-white">{{ currentTitle }}</h1>

      <div class="flex flex-wrap items-center gap-3">
        <VSearchInput
          v-model="filterQuery"
          wrapper-class="w-full sm:w-64"
          placeholder="Filter current view…"
          input-class="!bg-[#121214] !border-white/5 focus:!ring-1 focus:!ring-indigo-500/30"
          aria-label="Filter current view"
        />

        <VButton variant="ghost" size="sm" class="!bg-[#121214] !border-white/5 !px-4 !py-2 hover:!bg-white/5">
          Name
          <icon name="ph:arrow-up-bold" size="14" />
        </VButton>

        <VButton type="button" variant="ghost" size="sm" class="!p-2 !bg-[#121214] !border-white/5 hover:!bg-white/5"
          :title="viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'" @click="toggleViewMode">
          <icon :name="viewMode === 'grid' ? 'ph:list-dashes' : 'ph:grid-four-fill'" size="20"
            class="text-indigo-400" />
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '~/types/shared-components/breadcrumb'

const props = defineProps<{
  title?: string
  /** Override default Home → title trail */
  breadcrumbs?: BreadcrumbItem[]
}>()

const filterQuery = defineModel<string>('filterQuery', { default: '' })

const viewMode = defineModel<'grid' | 'list'>('viewMode', { default: 'grid' })

const currentTitle = computed(() => props.title ?? 'My Files')

function toggleViewMode() {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  if (props.breadcrumbs?.length) return props.breadcrumbs
  return [
    { label: 'Home', to: '/dashboard' },
    { label: currentTitle.value },
  ]
})
</script>