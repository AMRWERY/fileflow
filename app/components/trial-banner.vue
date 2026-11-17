<template>
  <div v-if="session.isTrial"
    class="shrink-0 flex flex-wrap items-center justify-between gap-2 border-b border-indigo-500/20 bg-indigo-500/10 px-6 md:px-8 py-2 text-xs">
    <p class="text-indigo-300">
      <span class="font-bold">Free trial</span> · {{ daysLeft }} day{{ daysLeft === 1 ? '' : 's' }} left ·
      browse everything; uploads (max {{ TRIAL_LIMITS.uploads }}) and folders (max {{ TRIAL_LIMITS.folders }}) are
      capped, and delete, share and invite are locked.
    </p>
    <NuxtLink to="/settings" class="font-bold text-indigo-400 hover:text-indigo-300">Upgrade</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const session = useAuthSessionStore()
const daysLeft = computed(() => {
  if (!session.trialEndsAt) return 0
  return Math.max(0, Math.ceil((new Date(session.trialEndsAt).getTime() - Date.now()) / 86_400_000))
})
</script>
