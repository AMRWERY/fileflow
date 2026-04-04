<template>
  <div
    class="bg-[#1c1c1f] border border-white/[0.05] p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all duration-300">
    <!-- Icon Container -->
    <div :class="[
      iconBgClass,
      'w-10 h-10 rounded-lg flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110',
    ]">
      <Icon :name="icon" size="24" :class="iconColorClass" />
    </div>

    <!-- Content -->
    <p class="text-[11px] font-bold text-gray-500 tracking-widest mb-1">
      {{ title }}
    </p>

    <div class="flex items-baseline gap-2" :class="{ 'mb-4': hasProgress }">
      <span class="text-4xl font-bold text-white tracking-tight">{{
        value
        }}</span>
      <span v-if="unit" class="text-lg font-medium text-gray-500">{{
        unit
        }}</span>

      <!-- Trend / Subtitle -->
      <div v-if="trend" class="flex items-center gap-1 ms-auto">
        <span class="text-[11px] font-bold flex items-center gap-1" :class="trendColorClass">
          <Icon v-if="trendIcon" :name="trendIcon" size="12" />
          {{ trend }}
        </span>
      </div>
      <span v-else-if="subtitle" class="text-[11px] text-gray-500 font-bold tracking-widest ms-auto">
        {{ subtitle }}
      </span>
    </div>

    <!-- Progress Bar (Optional) -->
    <div v-if="hasProgress" class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div class="h-full bg-orange-500 transition-all duration-1000" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { StatCardsProps } from '@/types/stat-cards'

defineProps<StatCardsProps>();
</script>