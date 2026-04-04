<template>
  <!-- Matches [id].vue folder layout: header + grid -->
  <div v-if="mode === 'folder'">
    <all-files-header-skeleton />
    <all-files-grid-skeleton :view="view" :folder-row-count="2" :file-card-count="4" />
  </div>

  <!-- Matches file preview: toolbar + viewport + sidebar -->
  <div v-else class="flex h-[calc(100vh-64px)] overflow-hidden bg-[#0a0a0c] text-gray-300">
    <div class="flex-1 flex flex-col min-w-0">
      <preview-header-skeleton />
      <div class="flex-1 flex items-center justify-center p-12">
        <skeleton-shimmer-block class="w-full max-w-4xl aspect-square max-h-[min(70vh,640px)] rounded-2xl" />
      </div>
    </div>
    <aside class="w-[360px] border-s border-white/5 bg-[#0e0e11] shrink-0 hidden lg:flex flex-col gap-4 p-5">
      <skeleton-shimmer-block class="h-32 w-full rounded-xl" />
      <skeleton-shimmer-block class="h-24 w-full rounded-xl" />
      <skeleton-shimmer-block class="h-40 w-full rounded-xl" />
    </aside>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    /** 'folder' = header + file grid skeleton; 'file' = preview layout */
    mode?: 'folder' | 'file'
    view?: 'grid' | 'list'
  }>(),
  { mode: 'folder', view: 'grid' },
)
</script>
