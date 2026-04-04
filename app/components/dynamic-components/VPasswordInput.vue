<template>
  <div>
    <label v-if="label" :for="inputId"
      class="block text-[11px] font-bold text-gray-500 tracking-wider mb-2 ms-1">
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="inputId"
        :type="showPassword ? 'text' : 'password'"
        :placeholder="placeholder ?? '••••••••'"
        :autocomplete="autocomplete"
        :name="name"
        :value="inputValue"
        @input="onInput"
        @blur="onBlur"
        :class="[
          'w-full bg-[#1c1c1f] border rounded-xl px-4 py-3 pe-11 text-sm text-white focus:outline-none focus:ring-2 transition-all placeholder:text-gray-700',
          displayError
            ? 'border-red-500/40 focus:ring-red-500/30'
            : 'border-white/[0.08] focus:ring-indigo-500/40',
        ]"
      />
      <button type="button" @click="showPassword = !showPassword"
        class="absolute end-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
        <Icon name="material-symbols:visibility-outline-rounded" v-if="!showPassword" />
        <Icon name="material-symbols:visibility-off-outline-rounded" v-else />
      </button>
    </div>

    <!-- Strength meter -->
    <div v-if="showStrengthMeter" class="mt-3">
      <div class="flex gap-1.5 h-1">
        <div v-for="i in 4" :key="i" :class="[
          'flex-1 rounded-full transition-colors duration-500',
          i <= strength ? 'bg-orange-500' : 'bg-white/10',
        ]" />
      </div>
      <p v-if="strength > 0" class="text-[11px] mt-2 text-orange-400 font-medium">
        Password strength: {{ strengthText }}
      </p>
    </div>

    <!-- Validation error -->
    <Transition name="vee-error">
      <p v-if="displayError" class="text-[11px] text-red-400 mt-1.5 ms-1">{{ displayError }}</p>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'

const props = defineProps<{
  modelValue?: string
  name?: string
  rules?: string
  label?: string
  id?: string
  placeholder?: string
  autocomplete?: string
  showStrengthMeter?: boolean
  error?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const showPassword = ref(false)
const autoInputId = useId()
const inputId = computed(() => props.id ?? autoInputId)

const { value: fieldValue, errorMessage, handleChange, handleBlur } = useField<string>(
  () => props.name ?? `__standalone_${autoInputId}`,
  computed(() => (props.name ? props.rules : undefined)),
  {
    initialValue: props.modelValue ?? '',
    label: computed(() => props.label ?? props.name),
  },
)

watch(() => props.modelValue, (val) => {
  if (!props.name && val !== undefined) fieldValue.value = val
})

const inputValue = computed(() => (props.name ? fieldValue.value : (props.modelValue ?? '')))
const displayError = computed(() => errorMessage.value || props.error)

const currentValue = computed(() => String(inputValue.value ?? ''))

const strength = computed(() => {
  const v = currentValue.value
  if (v.length === 0) return 0
  if (v.length < 6) return 1
  if (v.length < 10) return 2
  return 4
})

const strengthText = computed(() => {
  if (strength.value === 1) return 'Weak'
  if (strength.value === 2) return 'Fair'
  return 'Strong'
})

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
