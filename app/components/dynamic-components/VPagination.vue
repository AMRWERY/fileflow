<template>
  <div v-if="totalPages > 1" class="flex items-center justify-end gap-2 mt-12 py-2">
    <!-- Prev Button -->
    <VButton variant="secondary" size="sm"
      class="!p-2 !rounded-xl !bg-transparent hover:!bg-white/5 !border-white/5 !text-gray-400 hover:!text-white shadow-none transition-all"
      :disabled="modelValue <= 1" @click="modelValue--">
      <icon name="ph:caret-left-bold" size="18" />
    </VButton>

    <!-- Page Numbers -->
    <div class="flex items-center gap-2 mx-2">
      <template v-for="page in visiblePages" :key="page.label">
        <button v-if="page.type === 'page'" class="min-w-[40px] h-10 rounded-xl text-xs font-bold transition-all border"
          :class="page.label === modelValue
            ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
            : 'bg-[#121214] border-white/5 text-gray-500 hover:text-white hover:border-white/10 hover:bg-[#161619]'"
          @click="modelValue = page.label">
          {{ page.label }}
        </button>
        <span v-else class="w-10 text-center text-gray-600 font-bold">
          {{ page.label }}
        </span>
      </template>
    </div>

    <!-- Next Button -->
    <VButton variant="secondary" size="sm"
      class="!p-2 !rounded-xl !bg-transparent hover:!bg-white/5 !border-white/5 !text-gray-400 hover:!text-white shadow-none transition-all"
      :disabled="modelValue >= totalPages" @click="modelValue++">
      <icon name="ph:caret-right-bold" size="18" />
    </VButton>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    totalItems: number
    itemsPerPage?: number
  }>(),
  { itemsPerPage: 10 }
)

const modelValue = defineModel<number>({ default: 1 })

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const visiblePages = computed(() => {
  const current = modelValue.value
  const total = totalPages.value
  const pages: { type: 'page' | 'ellipsis', label: any }[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push({ type: 'page', label: i })
  } else {
    // 1 ... 4 5 6 ... 10
    pages.push({ type: 'page', label: 1 })

    if (current > 3) pages.push({ type: 'ellipsis', label: '...' })

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < total) pages.push({ type: 'page', label: i })
    }

    if (current < total - 2) pages.push({ type: 'ellipsis', label: '...' })

    pages.push({ type: 'page', label: total })
  }

  return pages
})
</script>