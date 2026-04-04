<template>
  <header
    class="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md z-10 shrink-0">
    <div class="flex items-center gap-4">
      <VBackButton />
      <h1 class="text-sm font-bold text-white tracking-tight">{{ filename }}</h1>
    </div>

    <div class="flex items-center gap-3">
      <VButton variant="secondary" size="sm"
        class="flex items-center gap-2 !px-4 !py-2 !rounded-xl !text-xs !font-bold">
        <icon name="ph:download-simple-bold" size="18" />
        Download
      </VButton>
      <VButton variant="secondary" size="sm"
        class="!p-2 !rounded-lg !bg-transparent hover:!bg-white/5 !border-white/5 shadow-none">
        <icon name="ph:dots-three-vertical-bold" size="20" />
      </VButton>
    </div>
  </header>
</template>

<script lang="ts" setup>
defineProps<{
  filename: string
}>()
</script>