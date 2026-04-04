<template>
  <div
    class="bg-[#1c1c1f] border border-white/[0.05] rounded-2xl p-4 hover:bg-[#252529] transition-all cursor-pointer group">
    <!-- Preview Area -->
    <div class="h-56 rounded-xl bg-[#0a0a0c] mb-4 flex items-center justify-center relative overflow-hidden">
      <!-- Mock preview patterns/colors -->
      <div v-if="file.type === 'image'"
        class="absolute inset-0 opacity-40 bg-gradient-to-br from-indigo-500 to-purple-600"></div>
      <div v-if="file.type === 'video'" class="absolute inset-0 opacity-20 bg-emerald-500"></div>

      <icon :name="file.icon" size="48"
        class="text-white/20 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300 relative z-10" />

      <div v-if="file.type === 'video'" class="absolute inset-0 flex items-center justify-center">
        <icon name="ph:play-circle-fill" size="32" class="text-white group-hover:scale-110 transition-all" />
      </div>
    </div>

    <!-- Metadata -->
    <div class="flex items-start gap-3">
      <icon :name="file.icon" class="mt-0.5 text-indigo-400" size="18" />
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-semibold text-white truncate mb-1">
          {{ file.name }}
        </h4>
        <p class="text-[11px] text-gray-600 font-bold tracking-tighter">
          {{ file.size }} • Updated {{ file.updated }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RecentFile } from "@/types/recent-file";

defineProps<{
  file: RecentFile;
}>();
</script>