<template>
  <VCard padding="none"
    class="flex items-center justify-between p-6 mb-12 bg-[#121214] border border-white/5 rounded-2xl shadow-xl">
    <div class="flex items-center gap-12">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
          <icon name="ph:file-duotone" class="text-indigo-400 text-lg" />
        </div>
        <div class="flex flex-col">
          <span class="text-[10px] font-black text-gray-500 tracking-widest">Files</span>
          <span class="text-sm font-bold text-white">{{ fileCount || 0 }}</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
          <icon name="ph:folder-duotone" class="text-amber-400 text-lg" />
        </div>
        <div class="flex flex-col">
          <span class="text-[10px] font-black text-gray-500 tracking-widest">Folders</span>
          <span class="text-sm font-bold text-white">{{ folderCount || 0 }}</span>
        </div>
      </div>

      <div class="h-8 w-px bg-white/5"></div>

      <div class="flex items-center gap-6">
        <div class="flex flex-col">
          <span class="text-[10px] font-black text-gray-500 tracking-widest mb-1">Storage Usage</span>
          <div class="flex items-center gap-4">
            <span class="text-xs font-bold text-white whitespace-nowrap">
              {{ usedStorage }} <span class="text-gray-600 font-medium lowercase">used of {{ totalStorage }}</span>
            </span>
            <div class="w-48 h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
              <div
                class="h-full bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.5)] transition-all duration-500"
                :style="{ width: storagePercentage + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <VButton variant="ghost" size="sm"
      class="!px-4 !py-1.5 !rounded-lg !text-[10px] !font-black !tracking-widest">
      Manage Storage
    </VButton>
  </VCard>
</template>

<script lang="ts" setup>
const props = defineProps<{
  fileCount: number
  folderCount: number
  usedStorage: string
  totalStorage: string
  storagePercentage: number
}>()
</script>