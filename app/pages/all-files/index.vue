<template>
  <div>
    <template v-if="showSkeleton">
      <all-files-header-skeleton />
      <all-files-grid-skeleton :view="viewMode" />
    </template>

    <template v-else>
      <!-- Page header -->
      <all-files-page-header v-model:filter-query="filterQuery" v-model:view-mode="viewMode"
        @upload="showUploadDialog = true" @new-folder="showNewFolderDialog = true" />

      <!-- File grid -->
      <all-files-grid :files="displayFiles" :view="viewMode" @toggle="toggleSelection"
        @delete-folder="openDeleteFolderDialog" />
    </template>

    <!-- Selection bar -->
    <all-files-selection-bar v-if="selectedCount >= 1" :count="selectedCount" @clear="clearSelection" />

    <!-- ── Upload Dialog ──────────────────────────────────────── -->
    <VDialog v-model="showUploadDialog" title="Upload Files"
      description="Choose files and optionally place them in a folder." icon="ph:upload-simple-bold"
      confirm-label="Upload" cancel-label="Cancel" :loading="store.isLoading" :confirm-disabled="!uploadFiles.length"
      @confirm="submitUpload" @close="resetUploadDialog">
      <!-- File picker -->
      <div
        class="border-2 border-dashed border-white/10 hover:border-indigo-500/40 rounded-xl p-6 text-center cursor-pointer transition-colors"
        @click="uploadInput?.click()" @dragover.prevent @drop.prevent="onDropFiles">
        <input ref="uploadInput" type="file" class="hidden" multiple @change="onPickFiles" />
        <Icon name="ph:upload-simple-duotone" size="32" class="text-indigo-400 mx-auto mb-2" />
        <p v-if="!uploadFiles.length" class="text-sm text-gray-400">
          Click or drag files here
        </p>
        <ul v-else class="text-start space-y-1 mt-1">
          <li v-for="f in uploadFiles" :key="f.name" class="flex items-center gap-2 text-xs text-gray-300">
            <Icon name="ph:file-duotone" size="14" class="text-indigo-400 shrink-0" />
            <span class="truncate">{{ f.name }}</span>
            <span class="text-gray-600 shrink-0">{{ formatSize(f.size) }}</span>
          </li>
        </ul>
      </div>

      <!-- Folder selector -->
      <div class="space-y-1.5">
        <label class="block text-[11px] font-bold text-gray-500 tracking-wider ms-1">
          Upload to folder (optional)
        </label>
        <select v-model="uploadFolderId"
          class="w-full bg-[#1c1c1f] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all">
          <option value="">My Files (root)</option>
          <option v-for="folder in store.folders" :key="folder.id" :value="folder.id">
            {{ folder.name }}
          </option>
        </select>
      </div>
    </VDialog>

    <!-- ── New Folder Dialog ─────────────────────────────────── -->
    <VDialog v-model="showNewFolderDialog" title="New Folder"
      description="Give your folder a name to keep your files organized." icon="lucide:folder-plus"
      confirm-label="Create" cancel-label="Cancel" :loading="store.isLoading" :confirm-disabled="!newFolderName.trim()"
      @confirm="submitNewFolder" @close="resetFolderDialog">
      <VInput v-model="newFolderName" label="Folder Name" placeholder="e.g. Project Assets" leading-icon="lucide:folder"
        @keyup.enter="submitNewFolder" />
    </VDialog>

    <!-- ── Delete Folder Dialog ──────────────────────────────── -->
    <VDialog v-model="showDeleteFolderDialog" title="Delete Folder"
      description="This will move the folder and all its contents to trash." icon="ph:trash-duotone"
      confirm-label="Delete" cancel-label="Cancel" confirm-variant="secondary" size="sm" :loading="store.isLoading"
      @confirm="submitDeleteFolder" @close="resetDeleteFolderDialog">
      <div class="flex items-center gap-3 rounded-xl bg-red-500/5 border border-red-500/10 px-4 py-3">
        <Icon name="ph:warning-duotone" size="20" class="text-red-400 shrink-0" />
        <p class="text-sm text-gray-400 leading-snug">
          <span class="font-semibold text-white">{{ folderToDeleteName }}</span>
          &nbsp;will be deleted along with all files inside it.
        </p>
      </div>
    </VDialog>
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
  isLoading,
  hasRootListingFetched,
  store,
} = useAllFilesPage()

// Skeleton until the first root listing request finishes. Before onMounted, isLoading is still false
// but the list is empty — without hasRootListingFetched we'd flash the empty state.
const showSkeleton = computed(
  () =>
    displayFiles.value.length === 0 &&
    (!hasRootListingFetched.value || isLoading.value),
)

const toast = useToast()

// ── Upload Dialog ───────────────────────────────────────────────
const showUploadDialog = ref(false)
const uploadInput = ref<HTMLInputElement | null>(null)
const uploadFiles = ref<File[]>([])
const uploadFolderId = ref<string>('')

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function onPickFiles(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files?.length) uploadFiles.value = Array.from(target.files)
}

function onDropFiles(e: DragEvent) {
  const dropped = e.dataTransfer?.files
  if (dropped?.length) uploadFiles.value = Array.from(dropped)
}

function resetUploadDialog() {
  uploadFiles.value = []
  uploadFolderId.value = ''
  if (uploadInput.value) uploadInput.value.value = ''
}

async function submitUpload() {
  if (!uploadFiles.value.length) return
  const folderId = uploadFolderId.value || null
  let allOk = true
  for (const file of uploadFiles.value) {
    const ok = await store.uploadFile(file, folderId)
    if (!ok) allOk = false
  }
  if (allOk) {
    showUploadDialog.value = false
    resetUploadDialog()
    toast.success('Upload complete', 'Your files have been uploaded.')
  } else {
    toast.error('Upload failed', store.error || 'One or more files could not be uploaded.')
  }
}

// ── New Folder Dialog ───────────────────────────────────────────
const showNewFolderDialog = ref(false)
const newFolderName = ref('')

function resetFolderDialog() {
  newFolderName.value = ''
}

async function submitNewFolder() {
  if (!newFolderName.value.trim()) return
  const name = newFolderName.value.trim()
  const ok = await store.createFolder(name, store.currentFolderId)
  if (ok) {
    showNewFolderDialog.value = false
    resetFolderDialog()
    toast.success('Folder created', `"${name}" is ready.`)
  } else {
    toast.error(
      'Could not create folder',
      store.error || 'Something went wrong.',
    )
  }
}

// ── Delete Folder Dialog ─────────────────────────────────────────
const showDeleteFolderDialog = ref(false)
const folderToDeleteId = ref<string | null>(null)
const folderToDeleteName = computed(() => {
  if (!folderToDeleteId.value) return ''
  return store.folders.find((f) => f.id === folderToDeleteId.value)?.name ?? 'This folder'
})

function openDeleteFolderDialog(id: string | number) {
  folderToDeleteId.value = String(id)
  showDeleteFolderDialog.value = true
}

function resetDeleteFolderDialog() {
  folderToDeleteId.value = null
}

async function submitDeleteFolder() {
  if (!folderToDeleteId.value) return
  await store.deleteItems([], [folderToDeleteId.value])
  if (!store.error) {
    showDeleteFolderDialog.value = false
    resetDeleteFolderDialog()
    toast.success('Folder deleted', 'The folder has been moved to trash.')
  } else {
    toast.error('Could not delete folder', store.error)
  }
}

useHead({
  titleTemplate: () => 'All Files',
});

definePageMeta({
  layout: 'dashboard'
})
</script>