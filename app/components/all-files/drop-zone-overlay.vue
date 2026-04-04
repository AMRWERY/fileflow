<template>
  <Transition name="fade">
    <div v-if="isDragging" class="absolute -inset-4 z-20">
      <div
        class="w-full h-full border-2 border-dashed border-indigo-500/40 rounded-[32px] bg-[#0a0a0c]/60 backdrop-blur-[2px] flex flex-col items-center justify-center">
        <div
          class="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-4 border border-indigo-500/30">
          <icon name="ph:cloud-arrow-up-fill" size="32" class="text-indigo-400" />
        </div>
        <h2 class="text-2xl font-bold text-white mb-2">Drop to upload</h2>
        <p class="text-gray-400 font-medium">Release to add files to {{ folderName }}</p>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
defineProps<{
  isDragging: boolean
  folderName: string
}>()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Keyframe for a subtle pulse on the drop zone */
@keyframes pulse-border {
  0% {
    border-color: rgba(99, 102, 241, 0.2);
  }

  50% {
    border-color: rgba(99, 102, 241, 0.5);
  }

  100% {
    border-color: rgba(99, 102, 241, 0.2);
  }
}

.border-dashed {
  animation: pulse-border 3s infinite ease-in-out;
}
</style>