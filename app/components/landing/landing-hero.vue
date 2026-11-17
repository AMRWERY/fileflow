<template>
  <section id="product" class="relative overflow-hidden px-4 pt-16 pb-12 text-center">
    <div class="pointer-events-none absolute inset-0"
      style="background: radial-gradient(ellipse at 50% 0%, rgba(107,92,231,0.12) 0%, transparent 60%)" />
    <div class="relative mx-auto max-w-3xl">
      <span
        class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#121214] px-3 py-1 font-mono text-xs text-gray-400">
        <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" /> FileFlow 2.0 is live · Zero-latency global file streaming
      </span>
      <h1 class="mt-5 text-4xl font-bold text-white sm:text-5xl md:text-6xl"
        style="line-height: 1.08; letter-spacing: -0.04em">
        The High-Performance Cockpit for Modern Enterprise Files
      </h1>
      <p class="mx-auto mt-4 max-w-xl text-base text-gray-400">
        Built for technical teams who demand instant preview, cryptographic provenance, and zero-friction file
        operations. No bloat. Pure velocity.
      </p>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" @click="session.startTrial()"
          class="inline-flex h-[38px] items-center rounded-xl bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-500">
          Start Free 14-Day Trial
        </button>
        <a href="#pricing"
          class="inline-flex h-[38px] items-center rounded-xl border border-white/10 bg-[#1c1c1f] px-4 text-sm font-medium text-white hover:bg-white/5">
          Book Enterprise Demo
        </a>
      </div>
      <p class="mt-8 text-xs uppercase tracking-[0.08em] text-gray-600">Trusted by data-intensive engineering
        teams at</p>
      <div
        class="mt-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-sm text-gray-600">
        <span v-for="b in brands" :key="b">{{ b }}</span>
      </div>
    </div>

    <!-- Product mock -->
    <div
      class="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#121214] text-start shadow-2xl">
      <div
        class="flex items-center justify-between border-b border-white/5 px-3 py-2 font-mono text-xs text-gray-600">
        <span>root / assets / q4-engine-render.mp4</span>
        <span class="rounded-lg bg-indigo-500/10 px-2 py-0.5 text-indigo-400">1,000,000 files</span>
      </div>
      <div class="grid md:grid-cols-[1fr_240px]">
        <div class="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
          <div v-for="f in files" :key="f.name"
            class="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0a0a0c] p-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl" :class="f.bg">
              <Icon :name="f.icon" size="16" :class="f.color" />
            </div>
            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-white">{{ f.name }}</p>
              <p class="font-mono text-xs text-gray-600">{{ f.meta }}</p>
            </div>
          </div>
        </div>
        <aside class="border-t border-white/5 p-4 md:border-s md:border-t-0">
          <p class="text-xs font-bold uppercase tracking-[0.08em] text-gray-600">Inspector matrix</p>
          <dl class="mt-3 space-y-3 font-mono text-xs">
            <div>
              <dt class="text-gray-600">Provenance hash</dt>
              <dd class="truncate text-gray-400">sha256:e8d0a31b9f…c4d7</dd>
            </div>
            <div>
              <dt class="text-gray-600">Edge replicas</dt>
              <dd class="text-gray-400">333 · 14 regions</dd>
            </div>
          </dl>
          <div
            class="mt-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-2 text-center text-xs text-indigo-400">
            Consensus verified in 5.4ms
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const session = useAuthSessionStore()

const brands = ['MONOLITH', 'VERCEL', 'LINEAR', 'DATADOG']

const files = [
  { name: 'Q4-Engine-Render.mp4', meta: '1.4 GB · 4 hours ago', icon: 'lucide:video', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { name: 'kernel_spl_v3.rs', meta: '48 KB · Just now', icon: 'lucide:code', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { name: 'Chassis_Aero_Mesh.step', meta: '2.46 GB · 1d ago', icon: 'lucide:archive', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { name: 'Audit_Compliance_2026.pdf', meta: '3.2 MB · 2d ago', icon: 'lucide:file-text', color: 'text-blue-400', bg: 'bg-blue-500/10' },
]
</script>
