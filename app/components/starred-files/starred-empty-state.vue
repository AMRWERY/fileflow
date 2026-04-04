<template>
  <div class="flex-1 flex flex-col items-center justify-center -mt-20 relative z-10">
    <VEmptyState
      icon="ph:star-fill"
      icon-size="40"
      title="No starred files yet"
      description="Star files to access them quickly. These items will be available offline and synced across your devices."
    >
      <template #actions>
        <div class="flex items-center gap-8">
          <VButton
            variant="secondary"
            class="!px-8 !py-3 !rounded-xl !text-sm !font-bold"
            @click="navigateTo('/all-files')"
          >
            Browse All Files
          </VButton>
          <button
            class="text-sm font-bold text-gray-500 hover:text-white transition-colors underline underline-offset-8 decoration-gray-800 hover:decoration-white"
          >
            Learn about pinning
          </button>
        </div>
      </template>
    </VEmptyState>
  </div>
</template>

<script lang="ts" setup>
// Re-using the premium empty state component
</script>

<style scoped>
:deep(.text-gray-600) {
  @apply text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)];
}
</style>