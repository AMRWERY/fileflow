<template>
  <Transition name="all-files-slide-up">
    <div v-if="count >= 1" class="fixed bottom-10 start-1/2 -translate-x-1/2 z-50">
      <VCard padding="none" class="!rounded-2xl !shadow-2xl border-white/10 !bg-[#1c1c1f]/90 backdrop-blur-xl">
        <div
          class="px-6 py-3 flex items-center gap-8 min-w-[min(100vw-2rem,400px)] flex-wrap justify-center sm:justify-between sm:flex-nowrap">
          <div class="flex items-center gap-3 pe-8 border-e border-white/5">
            <span class="text-sm font-bold text-white">{{ count }} items selected</span>
            <VButton variant="ghost" size="sm"
              class="!bg-transparent !border-0 !p-0 !text-[10px] !font-bold !text-indigo-400 hover:!text-indigo-300 !tracking-widest !shadow-none"
              @click="$emit('clear')">
              Clear
            </VButton>
          </div>

          <div class="flex items-center gap-6 text-gray-400">
            <VButton variant="ghost" size="sm" class="!p-1 !bg-transparent !border-0 hover:!text-white !shadow-none">
              <icon name="ph:folder-simple-user-duotone" size="22" />
            </VButton>
            <VButton variant="ghost" size="sm" class="!p-1 !bg-transparent !border-0 hover:!text-white !shadow-none">
              <icon name="ph:download-simple-duotone" size="22" />
            </VButton>
            <VButton variant="ghost" size="sm" class="!p-1 !bg-transparent !border-0 hover:!text-white !shadow-none">
              <icon name="ph:share-network-duotone" size="22" />
            </VButton>
            <div class="w-px h-4 bg-white/5" />
            <VButton variant="ghost" size="sm"
              class="!p-1 !bg-transparent !border-0 !text-red-400/80 hover:!text-red-400 !shadow-none">
              <icon name="ph:trash-duotone" size="22" />
            </VButton>
          </div>
        </div>
      </VCard>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
defineProps<{ count: number }>()

defineEmits<{ clear: [] }>()
</script>

<style scoped>
.all-files-slide-up-enter-active,
.all-files-slide-up-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.all-files-slide-up-enter-from,
.all-files-slide-up-leave-to {
  transform: translate(-50%, 100%);
  opacity: 0;
}
</style>