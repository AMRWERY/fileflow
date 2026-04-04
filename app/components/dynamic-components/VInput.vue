<template>
  <div>
    <label v-if="label" :for="inputId"
      class="block text-[11px] font-bold text-gray-500 tracking-wider mb-2 ms-1">
      {{ label }}
    </label>
    <div :class="leadingIcon ? 'relative group' : ''">
      <Icon v-if="leadingIcon" :name="leadingIcon"
        class="absolute start-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-focus-within:text-indigo-400 transition-colors"
        size="18" />
      <input
        :id="inputId"
        :type="type ?? 'text'"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :name="name"
        :value="inputValue"
        @input="onInput"
        @blur="onBlur"
        :class="[
          'w-full bg-[#1c1c1f] border rounded-xl text-sm text-white focus:outline-none focus:ring-2 transition-all placeholder:text-gray-700',
          leadingIcon ? 'ps-10 pe-4 py-2.5' : 'px-4 py-3',
          displayError
            ? 'border-red-500/40 focus:ring-red-500/30'
            : 'border-white/[0.08] focus:ring-indigo-500/40',
          inputClass,
        ]"
      />
    </div>
    <Transition name="vee-error">
      <p v-if="displayError" class="text-[11px] text-red-400 mt-1.5 ms-1">{{ displayError }}</p>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'

const props = defineProps<{
  /** Used for standalone v-model binding (when name is not provided) */
  modelValue?: string
  /** Field name for vee-validate registration – required when used inside VForm */
  name?: string
  /** vee-validate rule string e.g. "required|email|min:3" */
  rules?: string
  label?: string
  type?: string
  placeholder?: string
  autocomplete?: string
  id?: string
  required?: boolean
  /** Fallback error shown when not using vee-validate (name not set) */
  error?: string
  leadingIcon?: string
  inputClass?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const autoInputId = useId()
const inputId = computed(() => props.id ?? autoInputId)

const { value: fieldValue, errorMessage, handleChange, handleBlur } = useField<string>(
  () => props.name ?? `__standalone_${autoInputId}`,
  computed(() => (props.name ? props.rules : undefined)),
  {
    initialValue: props.modelValue ?? '',
    // Use the visible label as the field name in error messages ("Email is required.")
    label: computed(() => props.label ?? props.name),
  },
)

// Keep the internal vee-validate value in sync with v-model when used standalone
watch(() => props.modelValue, (val) => {
  if (!props.name && val !== undefined) fieldValue.value = val
})

/** When name is set, vee-validate owns the value; otherwise use modelValue */
const inputValue = computed(() => (props.name ? fieldValue.value : (props.modelValue ?? '')))
/** Show vee-validate error first, then the prop-based fallback */
const displayError = computed(() => errorMessage.value || props.error)

const onInput = (e: Event) => {
  handleChange(e)
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

const onBlur = (e: Event) => handleBlur(e as FocusEvent)
</script>

<style scoped>
.vee-error-enter-active,
.vee-error-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.vee-error-enter-from,
.vee-error-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>