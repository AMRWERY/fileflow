<template>
  <section>
    <div @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop"
      @click="triggerFilePicker" :class="[
        'border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all group cursor-pointer',
        isDragging
          ? 'border-indigo-500/50 bg-indigo-500/[0.04]'
          : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03]',
      ]">
      <input ref="fileInput" type="file" class="hidden" :multiple="multiple" :accept="accept"
        @change="handleFileInputChange" />

      <div :class="[
        'w-14 h-14 border border-white/5 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300',
        isDragging
          ? 'bg-indigo-500/10 scale-110'
          : 'bg-[#1c1c1f] group-hover:scale-110',
      ]">
        <icon name="ph:file-arrow-up-duotone" size="32"
          :class="isDragging ? 'text-indigo-400' : 'text-gray-500 group-hover:text-indigo-400'" />
      </div>

      <h3 class="text-lg font-bold text-white mb-1">
        {{ isDragging ? 'Drop files to upload' : 'Drop files here or click to upload' }}
      </h3>
      <p class="text-sm text-gray-600">
        {{ hint ?? 'Maximum file size 500MB' }}
      </p>

      <div v-if="files.length > 0" class="mt-6 w-full max-w-sm space-y-2" @click.stop>
        <div v-for="(file, index) in files" :key="index"
          class="flex items-center justify-between gap-3 bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2.5">
          <div class="flex items-center gap-2 min-w-0">
            <icon name="ph:file-duotone" class="text-indigo-400 shrink-0" size="18" />
            <span class="text-xs text-gray-300 truncate">{{ file.name }}</span>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <span class="text-[11px] text-gray-600">{{ formatSize(file.size) }}</span>
            <button type="button" @click="removeFile(index)" class="text-gray-600 hover:text-red-400 transition-colors">
              <icon name="ph:x-bold" size="12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  multiple?: boolean
  accept?: string
  hint?: string
}>()

const emit = defineEmits<{
  change: [files: File[]]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const files = ref<File[]>([])

const triggerFilePicker = () => fileInput.value?.click()

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  const droppedFiles = Array.from(event.dataTransfer?.files ?? [])
  addFiles(droppedFiles)
}

const handleFileInputChange = (event: Event) => {
  const selectedFiles = Array.from(
    (event.target as HTMLInputElement).files ?? []
  )
  addFiles(selectedFiles)
}

const addFiles = (newFiles: File[]) => {
  files.value = props.multiple ? [...files.value, ...newFiles] : newFiles
  emit('change', files.value)
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
  emit('change', files.value)
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
</script>