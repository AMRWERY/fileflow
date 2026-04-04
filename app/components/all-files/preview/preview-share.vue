<template>
  <section class="p-6 border-b border-white/5">
    <h3 class="text-[10px] font-bold text-gray-600 tracking-[0.2em] mb-4">Share</h3>
    <VButton variant="primary" full-width
      class="!py-3 !rounded-xl !text-sm !font-bold !bg-indigo-600 hover:!bg-indigo-500 mb-4 shadow-indigo-500/10 transition-all">
      Create Link
    </VButton>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  shareUrl: string
  expiry: string
}>()
</script>