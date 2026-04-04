<template>
  <section>
    <div
      class="border-2 border-dashed border-white/5 rounded-3xl p-12 flex flex-col items-center justify-center bg-white/[0.01] hover:bg-white/[0.03] transition-all group cursor-pointer">
      <!-- Icon Container -->
      <div
        class="w-14 h-14 bg-[#1c1c1f] border border-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
        <icon name="ph:file-arrow-up-duotone" size="32" class="text-gray-500 group-hover:text-indigo-400" />
      </div>
      <!-- Label -->
      <h3 class="text-lg font-bold text-white mb-1">
        Drop files here or click to upload
      </h3>
      <p class="text-sm text-gray-600">Maximum file size 500MB</p>
    </div>
  </section>
</template>

<script lang="ts" setup>

</script>