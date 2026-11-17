<template>
  <section class="mx-auto max-w-6xl px-4 pb-16">
    <div class="rounded-2xl border border-white/10 bg-[#121214] p-8 text-center md:p-12"
      style="background-image: radial-gradient(ellipse at 50% 0%, rgba(107, 92, 231, 0.12), transparent 65%)">
      <p class="font-mono text-xs text-indigo-400">READY TO ACCELERATE</p>
      <h2 class="mt-2 text-3xl font-bold text-white">Ready to accelerate your file infrastructure?</h2>
      <p class="mt-2 text-base text-gray-400">
        Deploy your first zero-latency workspace in under 60 seconds. No credit card required.
      </p>
      <form class="mx-auto mt-6 flex max-w-md gap-2" @submit.prevent="go">
        <input v-model="email" type="email" required placeholder="name@company.com" aria-label="Work email"
          class="h-[34px] flex-1 rounded-lg border border-white/10 bg-[#1c1c1f] px-2.5 text-sm text-white placeholder:text-gray-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40" />
        <button type="submit"
          class="h-[34px] rounded-xl bg-indigo-600 px-3 text-sm font-medium text-white hover:bg-indigo-500">
          Start Free Trial
        </button>
      </form>
      <p class="mt-3 font-mono text-xs text-gray-600">
        Instant deployment · SOC2 Type II certified · GDPR compliant
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
const email = ref('')
const session = useAuthSessionStore()
const go = () => session.startTrial(email.value)
</script>
