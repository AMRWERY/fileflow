<template>
  <div>
    <!-- ── Loading (skeleton) ───────────────────────────────────── -->
    <all-files-detail-page-skeleton v-if="pending" :mode="pendingSkeletonMode" :view="viewMode" />

    <!-- ── Folder View ──────────────────────────────────────────── -->
    <template v-else-if="folder">
      <all-files-page-header :title="folder.name" :breadcrumbs="breadcrumbs" v-model:filter-query="filterQuery"
        v-model:view-mode="viewMode" @upload="showUploadDialog = true" @new-folder="showNewFolderDialog = true" />

      <all-files-grid :files="displayItems" :view="viewMode" @toggle="toggleSelection"
        @delete-folder="openDeleteFolderDialog" />

      <all-files-selection-bar v-if="selectedCount >= 1" :count="selectedCount" @clear="clearSelection" />

      <!-- Upload Dialog -->
      <VDialog v-model="showUploadDialog" title="Upload Files" description="Choose files to upload into this folder."
        icon="ph:upload-simple-bold" confirm-label="Upload" cancel-label="Cancel" :loading="store.isLoading"
        :confirm-disabled="!uploadFiles.length" @confirm="submitUpload" @close="resetUploadDialog">
        <div
          class="border-2 border-dashed border-white/10 hover:border-indigo-500/40 rounded-xl p-6 text-center cursor-pointer transition-colors"
          @click="uploadInput?.click()" @dragover.prevent @drop.prevent="onDropFiles">
          <input ref="uploadInput" type="file" class="hidden" multiple @change="onPickFiles" />
          <Icon name="ph:upload-simple-duotone" size="32" class="text-indigo-400 mx-auto mb-2" />
          <p v-if="!uploadFiles.length" class="text-sm text-gray-400">Click or drag files here</p>
          <ul v-else class="text-start space-y-1 mt-1">
            <li v-for="f in uploadFiles" :key="f.name" class="flex items-center gap-2 text-xs text-gray-300">
              <Icon name="ph:file-duotone" size="14" class="text-indigo-400 shrink-0" />
              <span class="truncate">{{ f.name }}</span>
              <span class="text-gray-600 shrink-0">{{ formatSize(f.size) }}</span>
            </li>
          </ul>
        </div>
      </VDialog>

      <!-- New Folder Dialog -->
      <VDialog v-model="showNewFolderDialog" title="New Folder"
        description="Give your folder a name to keep your files organized." icon="lucide:folder-plus"
        confirm-label="Create" cancel-label="Cancel" :loading="store.isLoading"
        :confirm-disabled="!newFolderName.trim()" @confirm="submitNewFolder" @close="newFolderName = ''">
        <VInput v-model="newFolderName" label="Folder Name" placeholder="e.g. Project Assets"
          leading-icon="lucide:folder" @keyup.enter="submitNewFolder" />
      </VDialog>

      <!-- Delete Folder Dialog -->
      <VDialog v-model="showDeleteFolderDialog" title="Delete Folder"
        description="This will move the folder and all its contents to trash." icon="ph:trash-duotone"
        confirm-label="Delete" cancel-label="Cancel" confirm-variant="secondary" size="sm" :loading="store.isLoading"
        @confirm="submitDeleteFolder" @close="folderToDeleteId = null">
        <div class="flex items-center gap-3 rounded-xl bg-red-500/5 border border-red-500/10 px-4 py-3">
          <Icon name="ph:warning-duotone" size="20" class="text-red-400 shrink-0" />
          <p class="text-sm text-gray-400 leading-snug">
            <span class="font-semibold text-white">{{ folderToDeleteName }}</span>
            &nbsp;will be deleted along with all files inside it.
          </p>
        </div>
      </VDialog>
    </template>

    <!-- ── File Preview ─────────────────────────────────────────── -->
    <template v-else-if="fileRecord">
      <div class="flex h-[calc(100vh-64px)] overflow-hidden bg-[#0a0a0c] text-gray-300 font-sans">
        <!-- Main content -->
        <div class="flex-1 flex flex-col relative min-w-0">
          <preview-header :filename="fileRecord.name" :file-id="fileRecord.id" :download-url="fileRecord.signedUrl" />

          <!-- Image / video preview -->
          <template v-if="isPreviewable">
            <preview-viewport v-model:zoom="zoomLevel" :preview-url="fileRecord.signedUrl ?? ''"
              :title="fileRecord.name" :subtitle="fileRecord.mime_type ?? ''" />
          </template>

          <!-- Non-previewable file: icon fallback -->
          <div v-else class="flex-1 flex flex-col items-center justify-center gap-4 p-12">
            <div :class="['rounded-3xl p-8 bg-opacity-10', iconBgClass(fileType)]">
              <Icon :name="getFileIcon(fileType)" size="72" :class="getIconColor(fileType)" />
            </div>
            <p class="text-sm text-gray-500">No preview available for this file type</p>
            <a v-if="fileRecord.signedUrl" :href="fileRecord.signedUrl" target="_blank"
              class="text-indigo-400 hover:text-indigo-300 text-sm font-medium underline underline-offset-2">
              Open file ↗
            </a>
          </div>
        </div>

        <!-- Sidebar -->
        <preview-sidebar :file-details="computedFileDetails" :uploader="{ name: 'You', avatar: 'Y' }" :tags="[]"
          :versions="[]" :activity="[]" />
      </div>
    </template>

    <!-- ── Not found ────────────────────────────────────────────── -->
    <div v-else class="flex flex-col items-center justify-center py-32 gap-3 text-center">
      <Icon name="ph:file-x-duotone" size="48" class="text-gray-700" />
      <p class="text-sm font-medium text-gray-600">File or folder not found</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFilesStore } from '~/stores/filesStore'
import { storeToRefs } from 'pinia'
import { getFileIcon, getIconColor, iconBgClass } from '@/utils/all-file-icons'
import type { BreadcrumbItem } from '~/types/shared-components/breadcrumb'
import type { FileItem } from '@/types/all-files'

const route = useRoute()
const id = computed(() => route.params.id as string)
const toast = useToast()

// ── State (no await in setup — prevents Suspense infinite loop on navigation) ──
type FolderData = { id: string; name: string; parent_id: string | null; path: string; created_at: string }
type FileData = {
  id: string; name: string; mime_type: string | null; size: number; created_at: string
  storage_path: string; thumbnail_path: string | null; extension: string | null
  folder_id: string | null; signedUrl: string | null
}

const pending = ref(true)
const folder = ref<FolderData | null>(null)
const fileRecord = ref<FileData | null>(null)

// ── Store ────────────────────────────────────────────────────────
const store = useFilesStore()
const { files, folders } = storeToRefs(store)

const filterQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')

/** Drives loading skeleton: `sk=folder` from folder card, `sk=file` from file card; default file (preview header skeleton). */
const pendingSkeletonMode = computed<'folder' | 'file'>(() =>
  route.query.sk === 'folder' ? 'folder' : 'file',
)

// ── Mount: detect folder vs file, no reactive loop ───────────────
onMounted(async () => {
  try {
    const data = await $fetch<FolderData>(`/api/folders/${id.value}`, { credentials: 'include' })
    folder.value = data
    await store.fetchContents(id.value)
  } catch {
    // Not a folder — try as a file
    try {
      const data = await $fetch<FileData>(`/api/files/${id.value}`, { credentials: 'include' })
      fileRecord.value = data
    } catch {
      // Neither found
    }
  } finally {
    pending.value = false
  }
})

// ── File type helpers ────────────────────────────────────────────
const fileType = computed((): FileItem['type'] => {
  const mime = fileRecord.value?.mime_type ?? ''
  if (mime.startsWith('image/')) return 'image'
  if (mime.startsWith('video/')) return 'video'
  if (mime === 'application/pdf') return 'pdf'
  if (mime.includes('zip') || mime.includes('compressed')) return 'zip'
  if (mime.includes('sheet') || mime.includes('excel') || mime.includes('csv')) return 'sheet'
  return 'document'
})

const isPreviewable = computed(() => {
  const mime = fileRecord.value?.mime_type ?? ''
  return mime.startsWith('image/') || mime.startsWith('video/')
})

function formatBytes(bytes: number) {
  if (!+bytes) return '0 B'
  const k = 1024, sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const computedFileDetails = computed(() => {
  const f = fileRecord.value
  if (!f) return []
  return [
    { label: 'Type', value: f.extension?.toUpperCase() ?? f.mime_type ?? 'Unknown' },
    { label: 'Size', value: formatBytes(f.size) },
    { label: 'Created', value: f.created_at ? new Date(f.created_at).toLocaleDateString() : '-' },
  ]
})

// ── Folder view ──────────────────────────────────────────────────
const displayItems = computed(() => {
  const all = [...folders.value, ...files.value]
  const q = filterQuery.value.trim().toLowerCase()
  return q ? all.filter((item) => item.name.toLowerCase().includes(q)) : all
})

const selectedCount = computed(() => displayItems.value.filter((f) => f.selected).length)

function toggleSelection(itemId: string | number) {
  const item = files.value.find((f) => f.id === itemId) || folders.value.find((f) => f.id === itemId)
  if (item) item.selected = !item.selected
}
function clearSelection() {
  files.value.forEach((f) => (f.selected = false))
  folders.value.forEach((f) => (f.selected = false))
}

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { label: 'Home', to: '/dashboard' },
  { label: 'All Files', to: '/all-files' },
  { label: folder.value?.name ?? '' },
])

// ── Upload Dialog ────────────────────────────────────────────────
const showUploadDialog = ref(false)
const uploadInput = ref<HTMLInputElement | null>(null)
const uploadFiles = ref<File[]>([])

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
function onPickFiles(e: Event) {
  const t = e.target as HTMLInputElement
  if (t.files?.length) uploadFiles.value = Array.from(t.files)
}
function onDropFiles(e: DragEvent) {
  const dropped = e.dataTransfer?.files
  if (dropped?.length) uploadFiles.value = Array.from(dropped)
}
function resetUploadDialog() {
  uploadFiles.value = []
  if (uploadInput.value) uploadInput.value.value = ''
}
async function submitUpload() {
  if (!uploadFiles.value.length) return
  let allOk = true
  for (const file of uploadFiles.value) {
    const ok = await store.uploadFile(file, id.value)
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

// ── New Folder Dialog ────────────────────────────────────────────
const showNewFolderDialog = ref(false)
const newFolderName = ref('')

async function submitNewFolder() {
  if (!newFolderName.value.trim()) return
  const name = newFolderName.value.trim()
  const ok = await store.createFolder(name, id.value)
  if (ok) {
    showNewFolderDialog.value = false
    newFolderName.value = ''
    toast.success('Folder created', `"${name}" is ready.`)
  } else {
    toast.error('Could not create folder', store.error || 'Something went wrong.')
  }
}

// ── Delete Folder Dialog ─────────────────────────────────────────
const showDeleteFolderDialog = ref(false)
const folderToDeleteId = ref<string | null>(null)
const folderToDeleteName = computed(() =>
  store.folders.find((f) => f.id === folderToDeleteId.value)?.name ?? 'This folder'
)

function openDeleteFolderDialog(fid: string | number) {
  folderToDeleteId.value = String(fid)
  showDeleteFolderDialog.value = true
}
async function submitDeleteFolder() {
  if (!folderToDeleteId.value) return
  await store.deleteItems([], [folderToDeleteId.value])
  if (!store.error) {
    showDeleteFolderDialog.value = false
    folderToDeleteId.value = null
    toast.success('Folder deleted', 'The folder has been moved to trash.')
  } else {
    toast.error('Could not delete folder', store.error)
  }
}

// ── File preview zoom ────────────────────────────────────────────
const zoomLevel = ref(82)

useHead({
  titleTemplate: () => folder.value?.name ?? fileRecord.value?.name ?? 'Preview File',
  meta: [
    { name: 'description', content: 'Preview file or folder' },
  ],
})

definePageMeta({
  layout: 'dashboard'
})
</script>