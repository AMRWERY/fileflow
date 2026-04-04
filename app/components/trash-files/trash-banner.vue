<template>
  <div class="bg-amber-950/20 border-b border-amber-900/30 px-6 py-3 flex items-center justify-between shrink-0">
    <div class="flex items-center gap-3">
      <icon name="ph:warning-circle-fill" class="text-amber-500 shadow-sm" size="20" />
      <p class="text-sm font-medium text-amber-500/90 tracking-tight">
        Files in trash are permanently deleted after 30 days
      </p>
    </div>
    <VButton variant="secondary" size="sm"
      class="!bg-red-950/40 hover:!bg-red-900/60 !text-red-200 !border-red-900/30 !px-4 !py-2 !rounded-xl !font-bold !text-[11px] !tracking-widest transition-all"
      @click="$emit('empty')">
      Empty Trash
    </VButton>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  empty: []
}>()
</script>