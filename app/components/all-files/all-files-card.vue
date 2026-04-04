<template>
  <div @click="handleClick" :class="[
    'group relative bg-[#121214] border cursor-pointer transition-all duration-300',
    variant === 'list'
      ? 'flex flex-row items-stretch gap-4 rounded-2xl p-3 sm:p-4'
      : 'rounded-[22px] p-4 flex flex-col',
    file.selected
      ? 'border-indigo-500/50 ring-1 ring-indigo-500/20'
      : 'border-white/5 hover:border-white/10 hover:bg-[#161619]',
  ]">
    <!-- Checkbox for files -->
    <div v-if="file.type !== 'folder'" @click.stop="emit('toggle', file.id)" :class="[
      'absolute z-10 p-1 -m-1 cursor-pointer transition-all duration-200',
      variant === 'list' ? 'top-3 end-3' : 'top-4 end-4',
      file.selected ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100 scale-100'
    ]">
      <icon v-if="file.selected" name="ph:check-circle-fill"
        class="text-indigo-500 bg-white rounded-full all-files-check shadow-lg shadow-indigo-500/20" size="22" />
      <div v-else
        class="w-5 h-5 rounded-full border-2 border-white/20 bg-[#1c1c1f]/50 backdrop-blur-sm hover:border-indigo-400/50" />
    </div>

    <!-- Delete button for folders -->
    <div v-if="file.type === 'folder'" @click.stop="emit('delete-folder', file.id)" :class="[
      'absolute z-10 p-1.5 cursor-pointer transition-all duration-200 rounded-lg hover:bg-red-500/10',
      variant === 'list' ? 'top-3 end-3' : 'top-3 end-3',
      'opacity-0 group-hover:opacity-100',
    ]">
      <Icon name="ph:trash-duotone" size="16" class="text-red-400/70 hover:text-red-400" />
    </div>

    <div :class="[
      'rounded-xl bg-[#0a0a0c] flex items-center justify-center relative overflow-hidden shrink-0',
      variant === 'list'
        ? 'w-28 sm:w-32 h-20 sm:h-24'
        : 'h-56 w-full mb-4',
    ]">
      <!-- Folder thumbnail -->
      <template v-if="file.type === 'folder'">
        <div class="w-full h-full flex flex-col items-center justify-center gap-2">
          <div class="rounded-2xl bg-amber-500/10 p-4">
            <Icon name="ph:folder-duotone" size="36" class="text-amber-400" />
          </div>
          <span class="text-[10px] font-bold text-gray-500 px-2 truncate max-w-full">
            {{ file.previewFiles?.length ? `${file.previewFiles.length} file${file.previewFiles.length > 1 ? 's' : ''}` : 'Empty' }}
          </span>
        </div>
      </template>

      <template v-else-if="file.type === 'image' && file.previewUrl">
        <img :src="file.previewUrl"
          class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="" />
        <div
          class="absolute top-2 start-2 px-2 py-0.5 rounded-md bg-indigo-500/80 text-[10px] font-bold text-white tracking-tighter">
          Image
        </div>
      </template>
      <template v-else>
        <div :class="[
          'rounded-xl flex items-center justify-center bg-opacity-10',
          variant === 'list' ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-12 h-12',
          iconBgClass(file.type),
        ]">
          <icon :name="getFileIcon(file.type)" :size="variant === 'list' ? 24 : 32" :class="getIconColor(file.type)" />
        </div>
      </template>
    </div>

    <div :class="[
      'min-w-0 flex-1 flex flex-col justify-center',
      variant === 'list' ? 'space-y-1 pe-8' : 'space-y-1',
    ]">
      <h3 :class="[
        'font-bold text-white truncate',
        variant === 'list' ? 'text-sm sm:text-base' : 'text-sm',
      ]">
        {{ file.name }}
      </h3>
      <div
        class="flex items-center justify-between gap-4 text-[11px] font-bold text-gray-600 tracking-tighter">
        <span>{{ file.size }}</span>
        <span class="shrink-0">{{ file.meta }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FileItem } from '@/types/all-files'
import { getFileIcon, getIconColor, iconBgClass } from '@/utils/all-file-icons'

const props = withDefaults(
  defineProps<{
    file: FileItem
    variant?: 'grid' | 'list'
  }>(),
  { variant: 'grid' }
)

const emit = defineEmits<{
  toggle: [id: string | number]
  'delete-folder': [id: string | number]
}>()

const handleClick = () => {
  const id = props.file.id
  const sk = props.file.type === 'folder' ? 'folder' : 'file'
  return navigateTo({ path: `/all-files/${id}`, query: { sk } })
}
</script>

<style scoped>
.all-files-check {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}
</style>