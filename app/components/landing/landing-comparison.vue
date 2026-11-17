<template>
  <section id="benchmarks" class="mx-auto max-w-6xl px-4 py-16">
    <p class="font-mono text-xs text-indigo-400">// BENCHMARK COMPARISON</p>
    <div class="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <h2 class="max-w-md text-2xl font-bold text-white">
        Why engineering teams replace legacy cloud drives.
      </h2>
      <p class="max-w-xs text-base text-gray-400">
        Designed from zero for high-bandwidth engineering, raw binary streams, and enterprise security requirements
        without bloat.
      </p>
    </div>
    <div class="mt-8 overflow-x-auto rounded-xl border border-white/5">
      <table class="w-full min-w-[560px] text-base">
        <thead class="bg-[#121214] text-xs uppercase tracking-[0.08em] text-gray-600">
          <tr>
            <th class="px-4 py-3 text-start font-bold">Capability</th>
            <th class="px-4 py-3 text-start font-bold">Legacy enterprise cloud</th>
            <th class="px-4 py-3 text-start font-bold text-indigo-400">FileFlow Cockpit 2.0</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r.cap" class="border-t border-white/5 hover:bg-white/5">
            <td class="px-4 py-3 font-medium text-white">{{ r.cap }}</td>
            <td class="px-4 py-3 font-mono text-sm text-gray-600">{{ r.old }}</td>
            <td class="px-4 py-3 font-mono text-sm text-white">{{ r.now }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script lang="ts" setup>
const rows = [
  { cap: 'Maximum Single File Size', old: '15 GB to 250 GB', now: '5.0 TB single binary' },
  { cap: 'Global Edge Read Latency', old: '280ms – 850ms', now: '< 12ms p99 global' },
  { cap: 'Immutable Cryptographic Log', old: 'Delayed CSV export', now: 'Realtime SHA-256 stream' },
  { cap: 'Programmable API / CLI Rate Limits', old: '100 req/sec throttled', now: '100,000 req/sec dedicated' },
  { cap: 'Zero-Knowledge Key Architecture', old: 'Provider-held keys', now: 'Client sovereign enclave' },
]
</script>
