<template>
  <section class="border-y border-white/5 bg-[#121214]">
    <div class="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
      <div v-for="s in stats" :key="s.label">
        <p class="font-mono text-3xl font-bold text-white">{{ s.value }}</p>
        <p class="mt-1 text-xs uppercase tracking-[0.08em] text-gray-600">{{ s.label }}</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const stats = [
  { value: '99.999%', label: 'Uptime SLA guaranteed' },
  { value: '10M+', label: 'Files synced daily' },
  { value: '<12ms', label: 'Average edge latency' },
  { value: '256-bit', label: 'End-to-end encryption' },
]
</script>
