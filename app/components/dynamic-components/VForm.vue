<template>
  <form @submit="onSubmit" novalidate class="space-y-5">
    <slot />
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate'

const props = defineProps<{
  schema?: Record<string, string | Record<string, unknown>>
  initialValues?: Record<string, unknown>
}>()

const emit = defineEmits<{
  /** Fired only when all fields pass validation; receives the validated values. */
  submit: [values: Record<string, unknown>]
}>()

const { handleSubmit } = useForm({
  validationSchema: props.schema,
  initialValues: props.initialValues,
})

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>