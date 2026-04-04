<template>
  <div class="mt-auto p-6 bg-[#0e0e11] border-t border-white/5 sticky bottom-0">
    <div class="relative">
      <VInput v-model="comment" placeholder="Add a comment..."
        input-class="!bg-[#1c1c1f] !border-white/[0.05] !rounded-xl !py-3 !ps-4 !pe-12 !text-sm focus:!ring-2 focus:!ring-indigo-500/20" />
      <button class="absolute end-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-300 transition-colors">
        <icon name="ph:paper-plane-right-fill" size="18" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const comment = ref('')
</script>