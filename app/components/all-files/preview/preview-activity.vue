<template>
  <section class="p-6">
    <h3 class="text-[10px] font-bold text-gray-600 tracking-[0.2em] mb-6">Activity</h3>
    <div class="space-y-6 relative">
      <div class="absolute start-[13px] top-2 bottom-4 w-px bg-white/5"></div>
      <div v-for="item in activity" :key="item.id" class="flex gap-4 relative">
        <div
          :class="[item.iconBg, item.iconColor, 'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 z-10 border border-white/5 shadow-sm']">
          <icon :name="item.icon" size="14" />
        </div>
        <div>
          <p class="text-xs text-gray-400 leading-snug">
            <span class="font-bold text-gray-200">{{ item.user }}</span> {{ item.action }}
          </p>
          <p class="text-[10px] font-bold text-gray-600 tracking-tighter mt-1">{{ item.time }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps<{
  activity: { id: number, user: string, action: string, time: string, icon: string, iconBg: string, iconColor: string }[]
}>()
</script>