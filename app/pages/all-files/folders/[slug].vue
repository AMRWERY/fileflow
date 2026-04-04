<template>
  <div @dragenter="onDragEnter" @dragover="onDragOver" @dragleave="onDragLeave"
    @drop="onDrop">

    <!-- Folder Header -->
    <folder-header :title="folderName" :items-count="files.length" total-size="12.4 MB"
      :breadcrumb-items="breadcrumbItems" search-placeholder="Search in folder" v-model:view-mode="viewMode" />

    <!-- Main Content Area with Drop Zone -->
    <div class="relative min-h-[500px]">
      <!-- File Grid -->
      <folder-grid :files="paginatedFiles" :view="viewMode" @toggle-selection="toggleSelection" />

      <!-- Drag & Drop Overlay -->
      <drop-zone-overlay :is-dragging="isDragging" :folder-name="folderName" />
    </div>

    <!-- Pagination -->
    <v-pagination v-model="currentPage" :total-items="files.length" :items-per-page="itemsPerPage" />

    <!-- Selection Bar -->
    <all-files-selection-bar :count="selectedCount" @clear="clearSelection" />
  </div>
</template>

<script lang="ts" setup>
import type { FileItem } from '@/types/all-files'

const route = useRoute()
const folderName = computed(() => {
  const s = (route.params.slug as string) || 'Icons'
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ')
})

const breadcrumbItems = computed(() => [
  { label: 'Home', to: '/dashboard' },
  { label: 'My Files', to: '/all-files' },
  { label: folderName.value }
])

const isDragging = ref(false);
const dragCounter = ref(0);
const viewMode = ref<'grid' | 'list'>('grid')

const currentPage = ref(1)
const itemsPerPage = ref(8) // Set to 8 to fit 4 grid columns better if needed, or 10

const onDragEnter = (e: DragEvent) => {
  e.preventDefault();
  dragCounter.value++;
  isDragging.value = true;
};

const onDragLeave = (e: DragEvent) => {
  e.preventDefault();
  dragCounter.value--;
  if (dragCounter.value === 0) {
    isDragging.value = false;
  }
};

const onDragOver = (e: DragEvent) => {
  e.preventDefault();
};

const onDrop = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;
  dragCounter.value = 0;

  const droppedFiles = e.dataTransfer?.files;
  if (droppedFiles && droppedFiles.length > 0) {
    console.log('Dropped files:', droppedFiles);
  }
};

const files = ref<FileItem[]>([
  { id: 1, name: 'user-avatar-flat.svg', type: 'svg', size: '42 KB', ext: 'SVG', selected: true, meta: 'Yesterday' },
  { id: 2, name: 'hero-background.png', type: 'png', size: '2.4 MB', ext: 'PNG', selected: false, meta: '2 hours ago' },
  { id: 3, name: 'usage-guidelines.pdf', type: 'pdf', size: '850 KB', ext: 'PDF', selected: true, meta: 'Yesterday' },
  { id: 4, name: 'all-icons-backup.zip', type: 'zip', size: '5.2 MB', ext: 'ZIP', selected: true, meta: 'Oct 12, 2023' },
  { id: 5, name: 'metadata-spec.docx', type: 'docx', size: '12 KB', ext: 'DOCX', selected: false, meta: '4 days ago' },
  { id: 6, name: 'gradient-mesh-01.png', type: 'png', size: '1.1 MB', ext: 'PNG', selected: false, meta: '3 hours ago' },
  { id: 7, name: 'brand-assets-v2.zip', type: 'zip', size: '124 MB', ext: 'ZIP', selected: false, meta: '1 week ago' },
  { id: 8, name: 'logo-variations.svg', type: 'svg', size: '88 KB', ext: 'SVG', selected: false, meta: '2 weeks ago' },
  { id: 9, name: 'marketing-copy.docx', type: 'docx', size: '45 KB', ext: 'DOCX', selected: false, meta: 'Yesterday' },
  { id: 10, name: 'header-video-bg.mp4', type: 'video', size: '12.4 MB', ext: 'MP4', selected: false, meta: '5 hours ago' },
  { id: 11, name: 'spreadsheet-q1.xlsx', type: 'sheet', size: '2.1 MB', ext: 'XLSX', selected: false, meta: '3 days ago' },
  { id: 12, name: 'presentation-draft.pdf', type: 'pdf', size: '4.5 MB', ext: 'PDF', selected: false, meta: '6 days ago' },
]);

const paginatedFiles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return files.value.slice(start, end)
})

const selectedCount = computed(() => files.value.filter(f => f.selected).length);

const toggleSelection = (id: number) => {
  const file = files.value.find(f => f.id === id);
  if (file) file.selected = !file.selected;
};

const clearSelection = () => {
  files.value.forEach(f => f.selected = false);
};

definePageMeta({
  layout: 'dashboard',
})
</script>