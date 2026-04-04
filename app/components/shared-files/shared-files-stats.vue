<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
    <VCard v-for="stat in displayStats" :key="stat.label" padding="sm"
      class="group hover:border-white/10 transition-all duration-500">
      <div class="flex items-center gap-4">
        <div
          :class="[stat.color, 'w-10 h-10 rounded-xl bg-opacity-10 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner']">
          <icon :name="stat.icon" class="text-xl" />
        </div>
        <div>
          <p class="text-[10px] font-black tracking-[0.2em] text-gray-500 mb-1 leading-none">{{ stat.label }}
          </p>
          <div class="flex items-baseline gap-2">
            <h3 class="text-xl font-bold text-white tabular-nums">{{ stat.value }}</h3>
            <span v-if="stat.trend" class="text-[10px] font-bold text-emerald-400 opacity-60">+{{ stat.trend }}%</span>
          </div>
        </div>
      </div>
    </VCard>
  </div>
</template>

<script lang="ts" setup>
import type { SharingStats } from '~/types/shared-files'

const props = defineProps<{
  stats: SharingStats
}>()

const displayStats = computed(() => [
  { label: 'Total Received', value: props.stats.totalReceived, icon: 'ph:download-simple-duotone', color: 'bg-blue-500 text-blue-400', trend: 12 },
  { label: 'Contributors', value: props.stats.activeContributors, icon: 'ph:users-four-duotone', color: 'bg-purple-500 text-purple-400' },
  { label: 'Shared Storage', value: props.stats.storageUsed, icon: 'ph:database-duotone', color: 'bg-orange-500 text-orange-400' },
  { label: 'New This Week', value: props.stats.newThisWeek, icon: 'ph:sparkle-duotone', color: 'bg-emerald-500 text-emerald-400', trend: 4 }
])
</script>