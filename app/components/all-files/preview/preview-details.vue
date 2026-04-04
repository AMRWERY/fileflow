<template>
  <section class="p-6 border-b border-white/5">
    <h3 class="text-[10px] font-bold text-gray-600 tracking-[0.2em] mb-6">Details</h3>
    <div class="space-y-4">
      <div v-for="item in details" :key="item.label" class="flex justify-between items-center text-xs">
        <span class="text-gray-500 font-medium tracking-wider">{{ item.label }}</span>
        <span class="text-gray-300 font-bold">{{ item.value }}</span>
      </div>
      <div class="flex justify-between items-center text-xs">
        <span class="text-gray-500 font-medium tracking-wider">Uploaded By</span>
        <div class="flex items-center gap-2">
          <span class="text-gray-300 font-bold">{{ uploader.name }}</span>
          <div
            class="w-5 h-5 bg-indigo-500 rounded-md flex items-center justify-center text-[8px] font-bold text-white">
            {{ uploader.avatar }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  details: { label: string, value: string }[]
  uploader: { name: string, avatar: string }
}>()
</script>