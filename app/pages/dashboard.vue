<template>
  <div>
    <!-- Welcome Section -->
    <section class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">
          {{ greeting.icon }} {{ greeting.label }}, {{ firstName }}
        </h1>
        <div class="flex items-center gap-3 text-gray-500 font-medium">
          <span>{{ dateString }}</span>
          <span class="text-white/10">·</span>
          <span class="font-mono text-sm tracking-wide">{{ timeString }}</span>
        </div>
      </div>
      <div class="flex gap-3">
        <VButton variant="secondary">Manage Spaces</VButton>
        <VButton variant="gradient">New Document</VButton>
      </div>
    </section>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <stat-card title="Total Files" value="247" icon="ph:folder-open-duotone" icon-bg-class="bg-indigo-500/10"
        icon-color-class="text-indigo-400" trend="+12 this week" trend-icon="ph:trend-up-bold"
        trend-color-class="text-green-500" />

      <stat-card title="Storage Used" value="2.3" unit="GB" icon="ph:cloud-duotone" icon-bg-class="bg-orange-500/10"
        icon-color-class="text-orange-400" has-progress :progress="46" />

      <stat-card title="Shared Links" value="12" icon="ph:link-simple-horizontal-bold" icon-bg-class="bg-blue-500/10"
        icon-color-class="text-blue-400" subtitle="4 active permissions" />
    </div>

    <!-- Recent Files Section -->
    <section class="mb-12">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-white tracking-tight">
          Recent Files
        </h2>
        <VButton variant="ghost" size="sm"
          class="text-indigo-400 hover:text-indigo-300 tracking-widest !bg-transparent !border-0 !px-0">
          View all files
        </VButton>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <file-card v-for="file in recentFiles" :key="file.id" :file="file" />
      </div>
    </section>

    <!-- Drop Zone -->
    <VFileUpload :multiple="true" hint="Maximum file size 500MB" />
  </div>
</template>

<script lang="ts" setup>
import type { RecentFile } from "@/types/recent-file";

const auth = useAuthStore()
const supabaseUser = useSupabaseUser()
const { greeting, timeString, dateString } = useGreeting()

// Show only the first name for a friendlier greeting
const firstName = computed(() => {
  const full =
    auth.profile?.full_name ||
    supabaseUser.value?.user_metadata?.full_name ||
    supabaseUser.value?.user_metadata?.name ||
    supabaseUser.value?.email?.split('@')[0] ||
    'there'
  return full.split(' ')[0]
})

// Mock Data
const recentFiles = ref<RecentFile[]>([
  {
    id: 1,
    name: "Q4_Brand_Strategy.jpg",
    size: "1.2 MB",
    updated: "2h ago",
    type: "image",
    icon: "ph:image-duotone",
  },
  {
    id: 2,
    name: "Product_Requirements.pdf",
    size: "4.8 MB",
    updated: "5h ago",
    type: "doc",
    icon: "ph:file-pdf-duotone",
  },
  {
    id: 3,
    name: "Demo_Walkthrough.mp4",
    size: "142 MB",
    updated: "yesterday",
    type: "video",
    icon: "ph:video-camera-duotone",
  },
  {
    id: 4,
    name: "Annual_Budget_2024.xlsx",
    size: "840 KB",
    updated: "2 days ago",
    type: "sheet",
    icon: "ph:table-duotone",
  },
]);

definePageMeta({
  layout: 'dashboard',
})
</script>