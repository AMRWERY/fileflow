<template>
  <VBreadcrumb :items="breadcrumbItems" class="mb-4" />

  <header class="flex items-start justify-between mb-8">
    <div class="flex items-center gap-5">
      <div
        class="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xl shadow-lg">
        {{ initials }}
      </div>
      <div>
        <h1 class="text-3xl font-bold tracking-tight mb-2">{{ title }}</h1>
        <div class="flex items-center gap-4">
          <div class="flex -space-s-2">
            <img v-for="i in 3" :key="i" src="https://api.dicebear.com/7.x/avataaars/svg?seed=team"
              class="w-6 h-6 rounded-full border-2 border-[#0a0a0c] bg-gray-800" />
            <div
              class="w-6 h-6 rounded-full border-2 border-[#0a0a0c] bg-gray-900 flex items-center justify-center text-[8px] font-bold">
              +2
            </div>
          </div>
          <span class="text-xs text-gray-500 font-medium">{{ memberCount }} members</span>
          <button class="text-xs text-indigo-400 font-bold hover:underline">Invite</button>
        </div>
      </div>
    </div>

    <div class="flex gap-3">
      <VButton variant="secondary" size="md">
        <icon name="ph:folder-plus-bold" size="18" />
        New Folder
      </VButton>
      <VButton variant="primary" size="md" class="shadow-indigo-500/30 active:scale-95">
        <icon name="ph:cloud-arrow-up-bold" size="18" />
        Upload
      </VButton>
      <VButton variant="secondary" size="md" @click="isSidebarOpen = !isSidebarOpen"
        :class="{ 'text-indigo-400': isSidebarOpen }">
        <icon :name="isSidebarOpen ? 'ph:sidebar-simple-fill' : 'ph:sidebar-simple-bold'" size="18" />
        Activity
      </VButton>
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { BreadcrumbItem } from '~/types/shared-components/breadcrumb'

defineProps<{
  title: string
  initials: string
  memberCount: number
  breadcrumbItems: BreadcrumbItem[]
}>()

const isSidebarOpen = defineModel<boolean>('isSidebarOpen')
</script>