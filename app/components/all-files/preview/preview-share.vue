<template>
  <section class="p-6 border-b border-white/5">
    <h3 class="text-[10px] font-bold text-gray-600 tracking-[0.2em] mb-4">Share</h3>
    <VButton variant="primary" full-width
      class="!py-3 !rounded-xl !text-sm !font-bold !bg-indigo-600 hover:!bg-indigo-500 mb-4 shadow-indigo-500/10 transition-all">
      Create Link
    </VButton>
    <div class="bg-[#1c1c1f] rounded-xl p-3 border border-white/5 flex items-start justify-between">
      <div class="space-y-1 overflow-hidden">
        <p class="text-xs font-bold text-white truncate">{{ shareUrl }}</p>
        <p class="text-[10px] text-gray-600 font-bold tracking-tighter">{{ expiry }}</p>
      </div>
      <button class="text-gray-500 hover:text-white transition-colors mt-1">
        <icon name="ph:copy-bold" size="14" />
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  shareUrl: string
  expiry: string
}>()
</script>