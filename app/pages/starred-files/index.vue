<template>
  <div class="relative min-h-[calc(100vh-120px)] flex flex-col">
    <!-- Background Watermark -->
    <starred-watermark text="Starred" />

    <!-- Header Section -->
    <starred-header title="Starred Files" subtitle="Important assets pinned for quick access"
      :breadcrumb-items="breadcrumbItems" />

    <!-- Empty State Content -->
    <starred-empty-state />

    <!-- Bottom Utility Bar -->
    <starred-utility-bar />
  </div>
</template>

<script lang="ts" setup>
const breadcrumbItems = [
  { label: 'Monolith', to: '/dashboard' },
  { label: 'Starred Files' }
]

useHead({
  titleTemplate: () => 'Starred Files',
});

definePageMeta({
  layout: 'dashboard',
})
</script>