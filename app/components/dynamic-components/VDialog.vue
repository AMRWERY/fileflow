<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="dialog-backdrop">
      <div v-if="modelValue" class="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md"
        @click.self="onBackdropClick" />
    </Transition>

    <!-- Panel wrapper -->
    <Transition name="dialog-panel">
      <div v-if="modelValue" role="dialog" :aria-label="title" aria-modal="true"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-6" @click.self="onBackdropClick">
        <div :class="[
          'w-full flex flex-col overflow-hidden rounded-[20px]',
          'bg-gradient-to-br from-[#1a1a1e] to-[#16161a]',
          'border border-white/[0.08]',
          'shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_64px_rgba(0,0,0,0.6),0_4px_16px_rgba(99,102,241,0.08)]',
          sizeClass,
        ]">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 pt-5">
            <div class="flex items-center gap-2.5">
              <div v-if="icon"
                class="flex shrink-0 items-center justify-center w-8 h-8 rounded-[10px] border border-indigo-500/25 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-300">
                <Icon :name="icon" size="18" />
              </div>
              <h2 class="m-0 text-[15px] font-bold tracking-tight text-[#f1f1f3]">{{ title }}</h2>
            </div>
            <button v-if="closable" aria-label="Close dialog"
              class="flex shrink-0 items-center justify-center w-7 h-7 rounded-lg border border-transparent text-[#666] transition-all duration-150 cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.08] hover:text-[#cccccc]"
              @click="close">
              <Icon name="lucide:x" size="16" />
            </button>
          </div>

          <!-- Description -->
          <p v-if="description" class="mx-6 mt-1.5 text-[13px] leading-relaxed text-gray-500">
            {{ description }}
          </p>

          <!-- Body slot -->
          <div class="flex flex-col gap-4 p-6">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer || showActions" class="flex items-center justify-end gap-2.5 px-6 pb-5">
            <slot name="footer">
              <VButton variant="secondary" size="sm" @click="close">
                {{ cancelLabel }}
              </VButton>
              <VButton :variant="confirmVariant" size="sm" :loading="loading" :disabled="confirmDisabled"
                @click="$emit('confirm')">
                {{ confirmLabel }}
              </VButton>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title: string
    description?: string
    icon?: string
    size?: 'sm' | 'md' | 'lg'
    closable?: boolean
    closeOnBackdrop?: boolean
    showActions?: boolean
    confirmLabel?: string
    cancelLabel?: string
    confirmVariant?: 'primary' | 'gradient' | 'secondary' | 'ghost'
    loading?: boolean
    confirmDisabled?: boolean
  }>(),
  {
    size: 'md',
    closable: true,
    closeOnBackdrop: true,
    showActions: true,
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    confirmVariant: 'gradient',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  close: []
}>()

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'max-w-[380px]'
    case 'lg': return 'max-w-[640px]'
    default: return 'max-w-[480px]'
  }
})

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function onBackdropClick() {
  if (props.closeOnBackdrop) close()
}

// Close on Escape
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.modelValue && props.closable) close()
  }
  window.addEventListener('keydown', handler)
  onUnmounted(() => window.removeEventListener('keydown', handler))
})
</script>

<style scoped>
/* Backdrop */
.dialog-backdrop-enter-active,
.dialog-backdrop-leave-active {
  transition: opacity 0.2s ease;
}

.dialog-backdrop-enter-from,
.dialog-backdrop-leave-to {
  opacity: 0;
}

/* Panel */
.dialog-panel-enter-active {
  transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.dialog-panel-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.dialog-panel-enter-from {
  opacity: 0;
  transform: scale(0.93) translateY(8px);
}

.dialog-panel-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(4px);
}
</style>