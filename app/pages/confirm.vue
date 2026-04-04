<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0e0e10]">
    <div class="flex flex-col items-center gap-4 text-white">
      <div
        class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
        <Icon name="ph:cloud-bold" class="text-white text-xl" />
      </div>
      <p class="text-sm text-gray-400 animate-pulse">Signing you in…</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: false })

const route = useRoute()
const supabase = useSupabaseClient()

const code = route.query.code as string | undefined

if (code) {
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    await navigateTo('/auth/login')
  } else {
    await navigateTo('/dashboard')
  }
} else {
  await navigateTo('/auth/login')
}
</script>