<template>
  <div :class="['relative w-full group', wrapperClass]">
    <Icon :name="icon"
      class="absolute start-3 top-1/2 z-[1] -translate-y-1/2 text-gray-500 pointer-events-none transition-colors group-focus-within:text-indigo-400"
      size="18" />
    <input :id="inputId" :value="modelValue" type="text" role="searchbox" :placeholder="placeholder"
      :disabled="disabled" :autocomplete="autocomplete" :aria-label="ariaLabel ?? placeholder" @input="onInput" :class="[
        'w-full rounded-xl border border-white/[0.05] bg-[#1c1c1f] py-2.5 text-sm text-white transition-all placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20',
        showShortcut ? 'ps-10 pe-14 sm:pe-16' : 'ps-10 pe-4',
        inputClass,
      ]" />
    <kbd v-if="showShortcut"
      class="pointer-events-none absolute end-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-gray-500 sm:flex">
      ⌘K
    </kbd>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    /** Leading icon (e.g. magnifying glass or filter funnel) */
    icon?: string
    /** Show keyboard hint (e.g. in app header) */
    showShortcut?: boolean
    inputClass?: string
    wrapperClass?: string
    id?: string
    disabled?: boolean
    autocomplete?: string
    ariaLabel?: string
  }>(),
  {
    modelValue: '',
    placeholder: 'Search…',
    icon: 'ph:magnifying-glass',
    showShortcut: false,
    inputClass: '',
    wrapperClass: '',
    autocomplete: 'off',
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const autoId = useId()
const inputId = computed(() => props.id ?? autoId)

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>