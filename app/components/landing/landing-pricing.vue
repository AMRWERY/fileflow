<template>
  <section id="pricing" class="mx-auto max-w-6xl px-4 py-16">
    <div class="text-center">
      <p class="font-mono text-xs text-indigo-400">// PRICING MODEL</p>
      <h2 class="mt-2 text-2xl font-bold text-white">
        Predictable scale. Zero lock-in bandwidth penalties.
      </h2>
      <p class="mt-2 text-base text-gray-400">
        All plans include cryptographic integrity verification and unlimited edge reading nodes.
      </p>
    </div>
    <div class="mt-8 grid gap-3 md:grid-cols-3">
      <article v-for="p in plans" :key="p.name" :class="[
        'flex flex-col rounded-xl border bg-[#121214] p-5',
        p.featured ? 'border-indigo-500' : 'border-white/5',
      ]">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-white">{{ p.name }}</h3>
          <span v-if="p.featured"
            class="rounded-lg bg-indigo-500/10 px-1.5 py-0.5 text-xs font-medium text-indigo-400">Most popular</span>
        </div>
        <p class="mt-1 text-sm text-gray-400">{{ p.desc }}</p>
        <p class="mt-4 font-mono text-3xl font-bold text-white">
          {{ p.price }}<span v-if="p.unit" class="text-sm font-normal text-gray-600"> {{ p.unit }}</span>
        </p>
        <ul class="mt-4 flex-1 space-y-2">
          <li v-for="f in p.features" :key="f" class="flex items-start gap-2 text-base text-gray-400">
            <Icon name="lucide:check" size="14" class="mt-1 shrink-0 text-emerald-400" /> {{ f }}
          </li>
        </ul>
        <button type="button" @click="session.startTrial()" :class="[
          'mt-6 inline-flex h-8 items-center justify-center rounded-xl text-sm font-medium',
          p.featured
            ? 'bg-indigo-600 text-white hover:bg-indigo-500'
            : 'border border-white/10 bg-[#1c1c1f] text-white hover:bg-white/5',
        ]">{{ p.cta }}</button>
      </article>
    </div>
  </section>
</template>

<script lang="ts" setup>
const session = useAuthSessionStore()
const plans = [
  { name: 'Developer', desc: 'For independent engineers and small test clusters.', price: '$0', unit: '/ month', cta: 'Get Started Free', to: '/auth/sign-up', featured: false, features: ['100 GB Vault Storage', 'Up to 10 GB single file upload', 'SHA-256 verification', 'Community API access'] },
  { name: 'Pro Team', desc: 'High-frequency collaboration for working teams.', price: '$29', unit: '/ user / month', cta: 'Start 30-Day Free Pro Trial', to: '/auth/sign-up', featured: true, features: ['5 TB Pooled Edge Storage', 'Up to 1 TB single file uploads', '300+ Point Anycast Global CDN', 'Transfer-rate-bursting links', 'Role-Based Access Control (RBAC)'] },
  { name: 'Enterprise Custom', desc: 'Dedicated private clusters and compliance isolation.', price: 'Custom', unit: '', cta: 'Contact Enterprise Sales', to: '/auth/sign-up', featured: false, features: ['Unlimited Dedicated Storage Pools', 'Dedicated VPC / Bare-Metal Nodes', 'Custom KMS & Zero-Knowledge Enclave', '99.999% Financial SLA Support Pod'] },
]
</script>
