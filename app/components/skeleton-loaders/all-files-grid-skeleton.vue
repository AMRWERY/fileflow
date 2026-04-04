<template>
  <div class="space-y-8">
    <!-- Folders section -->
    <section>
      <skeleton-shimmer-block class="h-3 w-16 rounded-md mb-3 ms-1" />

      <div v-if="view !== 'list'" class="space-y-4">
        <div v-for="r in folderRowCount" :key="`fr-${r}`" class="grid grid-cols-4 gap-4">
          <all-files-card-skeleton variant="grid" />
          <all-files-card-skeleton variant="grid" />
          <all-files-card-skeleton variant="grid" />
          <all-files-card-skeleton variant="grid" />
        </div>
      </div>
      <div v-else class="flex flex-col gap-3">
        <all-files-card-skeleton v-for="r in listFolderCount" :key="`fl-${r}`" variant="list" />
      </div>
    </section>

    <!-- Files section -->
    <section>
      <skeleton-shimmer-block class="h-3 w-12 rounded-md mb-3 ms-1" />
      <div
        :class="
          view === 'list'
            ? 'flex flex-col gap-3'
            : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
        "
      >
        <all-files-card-skeleton v-for="i in fileCardCount" :key="`fc-${i}`" :variant="view" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    view?: 'grid' | 'list'
    folderRowCount?: number
    listFolderCount?: number
    fileCardCount?: number
  }>(),
  {
    view: 'grid',
    folderRowCount: 2,
    listFolderCount: 4,
    fileCardCount: 4,
  },
)
</script>
