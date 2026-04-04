<template>
  <div class="flex-1 flex flex-col items-center justify-center -mt-20 relative z-10">
    <div
      class="w-24 h-24 bg-[#121214] border border-white/5 rounded-3xl flex items-center justify-center mb-8 shadow-2xl relative group">
      <div
        class="absolute inset-0 bg-amber-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      </div>
      <icon name="ph:star-fill" size="40"
        class="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)] relative z-10" />
    </div>

    <h2 class="text-xl font-bold text-white mb-3">No starred files yet</h2>
    <p class="text-gray-500 text-center max-w-sm text-sm leading-relaxed mb-10">
      Star files to access them quickly. These items will be available offline and synced across your devices.
    </p>

    <div class="flex items-center gap-8">
      <VButton variant="secondary" @click="navigateTo('/all-files')"
        class="!px-8 !py-3 !rounded-xl !text-sm !font-bold">
        Browse All Files
      </VButton>
      <button
        class="text-sm font-bold text-gray-500 hover:text-white transition-colors underline underline-offset-8 decoration-gray-800 hover:decoration-white">
        Learn about pinning
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>