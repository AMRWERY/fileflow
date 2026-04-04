<template>
  <div class="fixed bottom-10 start-1/2 -translate-x-1/2 z-30">
    <div
      class="bg-[#1c1c1f]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl flex items-center gap-8 transition-all hover:border-white/20">
      <div class="flex items-center gap-2 pe-8 border-e border-white/5">
        <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
        <span class="text-[10px] font-bold text-gray-400 tracking-widest">System Online</span>
      </div>

      <div class="flex items-center gap-6 text-gray-500">
        <button v-for="action in actions" :key="action.icon"
          class="hover:text-white transition-all hover:scale-110 active:scale-95" :title="action.label">
          <icon :name="action.icon" size="18" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const actions = [
  { label: 'Files', icon: 'ph:file-bold' },
  { label: 'Folders', icon: 'ph:folder-bold' },
  { label: 'Share', icon: 'ph:share-network-bold' },
]
</script>