<template>
  <section id="features" class="mx-auto max-w-6xl px-4 py-16">
    <p class="font-mono text-xs text-indigo-400">// KINETIC ARCHITECTURE</p>
    <h2 class="mt-2 max-w-md text-2xl font-bold text-white">
      Engineered for absolute throughput and cryptographic trust.
    </h2>
    <div class="mt-8 grid gap-3 md:grid-cols-3">
      <article v-for="f in features" :key="f.title"
        class="flex flex-col rounded-xl border border-white/5 bg-[#121214] p-4 transition-colors hover:border-white/20">
        <div class="mb-4 flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
          <Icon :name="f.icon" size="16" />
        </div>
        <h3 class="text-base font-bold text-white">{{ f.title }}</h3>
        <p class="mt-2 flex-1 text-base text-gray-400">{{ f.text }}</p>
        <p class="mt-4 rounded-lg bg-[#1c1c1f] px-2 py-1 font-mono text-xs text-gray-400">{{ f.code }}</p>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
const features = [
  { icon: 'lucide:zap', title: 'Sub-millisecond Global Edge Cache', text: 'Instant previewing and real-time streaming across 330+ edge nodes worldwide. Files are segmented, parallelized, and buffered milliseconds from the requestor.', code: 'Global TTFB: 8.2ms p99' },
  { icon: 'lucide:fingerprint', title: 'Cryptographic Asset Provenance', text: 'Every byte carries an immutable SHA-256 chain tag. Zero-trust verification guarantees an unbroken audit trail from upload to download.', code: 'zero-knowledge proof verified' },
  { icon: 'lucide:users', title: 'Frictionless Team Spaces', text: 'Granular role-based ACLs, ephemeral client links with auto-destruction counters, and dedicated encrypted multi-tenant storage.', code: 'RBAC · SSO · TLS 1.3' },
]
</script>
