<template>
  <section class="p-6 border-b border-white/5">
    <h3 class="text-[10px] font-bold text-gray-600 tracking-[0.2em] mb-4">Tags</h3>
    <div class="flex flex-wrap gap-2">
      <span v-for="tag in tags" :key="tag"
        class="px-3 py-1.5 bg-white/5 rounded-lg text-[11px] font-bold hover:bg-white/10 transition-colors cursor-pointer border border-white/5 tracking-tight">
        {{ tag }}
      </span>
      <button
        class="p-1.5 bg-white/5 rounded-lg border border-white/5 text-gray-500 hover:text-white transition-colors">
        <icon name="ph:plus-bold" size="12" />
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  tags: string[]
}>()
</script>