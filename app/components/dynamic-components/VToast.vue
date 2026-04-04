<template>
  <div class="fixed bottom-4 end-4 z-[100] flex flex-col gap-2 pointer-events-none w-full max-w-sm">
    <TransitionGroup enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-2" move-class="transition-all duration-300">
      <div v-for="toast in toasts" :key="toast.id"
        class="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border bg-[#111113] shadow-2xl shadow-black/50 overflow-hidden relative"
        :class="getToastClasses(toast.type).border">
        <!-- Icon -->
        <div class="mt-0.5 shrink-0" :class="getToastClasses(toast.type).text">
          <Icon :name="getToastClasses(toast.type).icon" size="20" />
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold text-white leading-snug">{{ toast.title }}</h4>
          <p v-if="toast.message" class="text-[12px] text-gray-400 mt-0.5 leading-relaxed">{{ toast.message }}</p>
        </div>

        <!-- Close -->
        <button @click="removeToast(toast.id)"
          class="shrink-0 p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors mt-[-2px]">
          <Icon name="ph:x-bold" size="14" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
const { toasts, removeToast } = useToast()

const getToastClasses = (type: string) => {
  switch (type) {
    case 'success':
      return {
        border: 'border-green-500/20',
        text: 'text-green-400',
        icon: 'ph:check-circle-duotone'
      }
    case 'error':
      return {
        border: 'border-red-500/20',
        text: 'text-red-400',
        icon: 'ph:warning-circle-duotone'
      }
    case 'warning':
      return {
        border: 'border-amber-500/20',
        text: 'text-amber-400',
        icon: 'ph:warning-duotone'
      }
    case 'info':
    default:
      return {
        border: 'border-indigo-500/20',
        text: 'text-indigo-400',
        icon: 'ph:info-duotone'
      }
  }
}
</script>