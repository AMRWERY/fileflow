<template>
  <div class="flex text-gray-300 font-sans min-h-screen bg-[#0a0a0c] selection:bg-indigo-500/30">
    <main class="flex-1 flex flex-col p-6 md:p-8">
      <slot />
    </main>
    <VToast />
  </div>
</template>

<script lang="ts" setup>

</script>