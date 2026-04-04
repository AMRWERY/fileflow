<template>
  <div
    class="flex h-dvh min-h-0 overflow-hidden text-gray-300 font-sans bg-[#0a0a0c] selection:bg-indigo-500/30">
    <!-- Mobile Overlay -->
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
      enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="isOpen" @click="close" class="fixed inset-0 bg-black/60 z-10 lg:hidden" />
    </Transition>

    <!-- Sidebar -->
    <Sidebar />

    <!-- Main: header stays put; only the slot area scrolls -->
    <main class="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden lg:ms-64">
      <div
        class="shrink-0 z-30 border-b border-white/5 bg-[#0a0a0c]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#0a0a0c]/80 px-6 md:px-8 pt-6 md:pt-8 pb-4">
        <AppHeader />
      </div>
      <div
        class="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-6 md:px-8 pt-6 md:pt-8 pb-8 md:pb-10">
        <slot />
      </div>
    </main>

    <VToast />
  </div>
</template>

<script lang="ts" setup>
const { isOpen, close } = useSidebar()
</script>