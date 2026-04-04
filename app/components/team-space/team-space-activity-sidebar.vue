<template>
  <Transition name="fade-slide">
    <aside v-if="isOpen" class="w-80 border-s border-white/5 bg-[#0e0e11] flex flex-col h-full shrink-0">
      <div class="p-8 flex items-center justify-between">
        <h3 class="text-xs font-black text-gray-500 tracking-[0.2em] shrink-0">Activity</h3>
        <div class="flex items-center gap-4">
          <button
            class="text-[10px] font-black text-gray-400 tracking-widest hover:text-indigo-400 transition-colors">
            View All
          </button>
          <button @click="$emit('close')"
            class="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors">
            <icon name="ph:x-bold" size="14" />
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto px-8 pb-8 space-y-8 no-scrollbar">
        <div v-for="act in activities" :key="act.id" class="flex gap-4 group">
          <img :src="act.avatar" class="w-8 h-8 rounded-lg bg-gray-800 p-0.5 border border-white/5 shrink-0" />
          <div class="min-w-0">
            <p class="text-xs text-gray-400 leading-snug">
              <span class="font-bold text-gray-200">{{ act.user }}</span> {{ act.action }}
              <span
                class="text-indigo-400 font-semibold cursor-pointer hover:underline truncate inline-block max-w-full align-bottom">
                {{ act.target }}
              </span>
            </p>
            <p class="text-[10px] font-bold text-gray-600 tracking-tighter mt-1">{{ act.time }}</p>
          </div>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<script lang="ts" setup>
import type { Activity } from '~/types/team-space'

defineProps<{
  activities: Activity[]
  isOpen: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>