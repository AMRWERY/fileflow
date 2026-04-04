<template>
  <div class="absolute bottom-[-20px] end-8 pointer-events-none select-none">
    <span class="text-[140px] font-black text-white/[0.02] tracking-tighter">{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  text?: string
}>(), {
  text: 'Starred'
})
</script>