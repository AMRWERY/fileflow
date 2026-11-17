<template>
  <footer class="border-t border-white/5 bg-[#121214]">
    <div class="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
      <div>
        <p class="text-lg font-bold text-white">FileFlow</p>
        <p class="mt-2 max-w-xs text-sm text-gray-400">
          The high-performance cockpit for modern files. Uncompromising speed, granular compliance, and
          edge-distributed enterprise storage.
        </p>
      </div>
      <div v-for="col in cols" :key="col.title">
        <p class="text-xs font-bold uppercase tracking-[0.08em] text-gray-600">{{ col.title }}</p>
        <ul class="mt-3 space-y-2">
          <li v-for="l in col.links" :key="l">
            <a href="#" class="text-sm text-gray-400 hover:text-white">{{ l }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/5">
      <div
        class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-gray-600">
        <span>© 2026 FileFlow Technologies. All rights reserved.</span>
        <span class="flex gap-4">
          <a href="#" class="hover:text-white">Privacy Policy</a>
          <a href="#" class="hover:text-white">Terms of Service</a>
          <a href="#" class="hover:text-white">Compliance</a>
        </span>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const cols = [
  { title: 'Product', links: ['File Transfer', 'Edge Acceleration', 'Granular Sync', 'Pricing & Tiers'] },
  { title: 'Solutions', links: ['Media Production', 'Engineering CAD', 'Biotech & Health', 'Financial Audit'] },
  { title: 'Security', links: ['Zero-Knowledge', 'SOC2 Type II', 'HIPAA Shield', 'Key Management'] },
  { title: 'Company', links: ['About Us', 'Careers', 'Trust Center', 'Privacy & Legal'] },
]
</script>
