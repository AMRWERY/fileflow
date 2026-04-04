<template>
  <div class="space-y-8">
    <!-- ── Folder rows ─────────────────────────────────────────── -->
    <section v-if="folders.length">
      <p class="text-[11px] font-bold text-gray-600 tracking-widest uppercase mb-3 ms-1">Folders</p>

      <!-- Grid mode: 1 folder + up to 3 preview files per row -->
      <div v-if="view !== 'list'" class="space-y-4">
        <div v-for="folder in folders" :key="folder.id" class="grid grid-cols-4 gap-4">
          <!-- Folder card -->
          <all-files-card :file="folder" variant="grid" @toggle="$emit('toggle', $event)"
            @delete-folder="$emit('delete-folder', $event)" />

          <!-- First 3 preview files (or placeholder slots) -->
          <template v-for="i in 3" :key="`${folder.id}-slot-${i}`">
            <all-files-card v-if="folder.previewFiles?.[i - 1]" :file="previewToFileItem(folder.previewFiles[i - 1])"
              variant="grid" @toggle="$emit('toggle', $event)" />
            <div v-else class="rounded-[22px] border border-dashed border-white/[0.05] bg-transparent" />
          </template>
        </div>
      </div>

      <!-- List mode: folders in a vertical list -->
      <div v-else class="flex flex-col gap-3">
        <all-files-card v-for="folder in folders" :key="folder.id" :file="folder" variant="list"
          @toggle="$emit('toggle', $event)" @delete-folder="$emit('delete-folder', $event)" />
      </div>
    </section>

    <!-- ── Loose files ─────────────────────────────────────────── -->
    <section v-if="looseFiles.length">
      <p class="text-[11px] font-bold text-gray-600 tracking-widest uppercase mb-3 ms-1">Files</p>
      <div :class="view === 'list'
        ? 'flex flex-col gap-3'
        : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
        ">
        <all-files-card v-for="file in looseFiles" :key="file.id" :file="file" :variant="view"
          @toggle="$emit('toggle', $event)" />
      </div>
    </section>

    <!-- Empty state -->
    <VEmptyState v-if="!folders.length && !looseFiles.length" title="No files or folders yet"
      description="Upload files or create a folder to get started." icon="ph:folder-open-duotone" />
  </div>
</template>

<script lang="ts" setup>
import type { FileItem, FolderPreviewFile } from '@/types/all-files'

const props = withDefaults(
  defineProps<{
    files: FileItem[]
    view?: 'grid' | 'list'
  }>(),
  { view: 'grid' }
)

defineEmits<{
  toggle: [id: string | number]
  'delete-folder': [id: string | number]
}>()

const folders = computed(() => props.files.filter((f) => f.type === 'folder'))
const looseFiles = computed(() => props.files.filter((f) => f.type !== 'folder'))

function previewToFileItem(pf: FolderPreviewFile): FileItem {
  return {
    id: pf.id,
    name: pf.name,
    type: pf.type as FileItem['type'],
    size: '',
    meta: '',
    selected: false,
  }
}
</script>