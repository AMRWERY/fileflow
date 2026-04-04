<template>
  <div>
    <all-files-page-header v-model:filter-query="filterQuery" v-model:view-mode="viewMode" />

    <all-files-grid :files="displayFiles" :view="viewMode" @toggle="toggleSelection" />

    <all-files-selection-bar v-if="selectedCount >= 1" :count="selectedCount" @clear="clearSelection" />
  </div>
</template>

<script setup lang="ts">
const {
  filterQuery,
  viewMode,
  displayFiles,
  selectedCount,
  toggleSelection,
  clearSelection,
} = useAllFilesPage()

definePageMeta({
  layout: 'dashboard',
})
</script>