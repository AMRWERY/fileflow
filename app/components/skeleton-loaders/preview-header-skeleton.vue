<template>
  <header
    class="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md z-10 shrink-0">
    <div class="flex items-center gap-4 min-w-0 flex-1">
      <skeleton-shimmer-block class="h-9 w-9 rounded-xl shrink-0" />
      <skeleton-shimmer-block class="h-4 w-full max-w-xs sm:max-w-md rounded-md" />
    </div>

    <div class="flex items-center gap-3 shrink-0 ms-4">
      <skeleton-shimmer-block class="h-9 w-[7.5rem] rounded-xl hidden sm:block" />
      <skeleton-shimmer-block class="h-9 w-[6.5rem] rounded-xl" />
    </div>
  </header>
</template>

<script lang="ts" setup>

</script>