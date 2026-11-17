<template>
  <header class="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0c]/85 backdrop-blur-md">
    <div class="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
      <div class="flex items-center gap-8">
        <NuxtLink to="/" class="text-lg font-bold tracking-tight text-white">FileFlow</NuxtLink>
        <nav class="hidden md:flex items-center gap-1" aria-label="Primary">
          <a v-for="l in links" :key="l.label" :href="l.href"
            class="rounded-xl px-3 py-1 text-sm text-gray-400 transition-colors hover:bg-white/5 hover:text-white">
            {{ l.label }}
          </a>
        </nav>
      </div>
      <div class="flex items-center gap-2">
        <NuxtLink to="/auth/login"
          class="hidden sm:inline-flex h-8 items-center rounded-xl px-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white">
          Sign In
        </NuxtLink>
        <button type="button" @click="session.startTrial()"
          class="inline-flex h-8 items-center rounded-xl bg-indigo-600 px-3 text-sm font-medium text-white hover:bg-indigo-500">
          Start Free Trial
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const session = useAuthSessionStore()
const links = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Security', href: '#benchmarks' },
  { label: 'Enterprise', href: '#testimonial' },
  { label: 'Pricing', href: '#pricing' },
]
</script>
