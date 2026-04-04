<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center">
      <div class="w-full border-t border-white/[0.05]"></div>
    </div>
    <div class="relative flex justify-center text-[10px] tracking-widest">
      <span class="bg-[#121214] px-3 text-gray-500 font-bold">{{ text }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  text?: string
}>()
</script>