<template>
  <section id="testimonial" class="mx-auto max-w-6xl px-4 pb-16">
    <div class="grid gap-4 rounded-2xl border border-white/5 bg-[#121214] p-6 md:grid-cols-[1fr_220px] md:p-8">
      <figure>
        <div class="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
          <Icon v-for="i in 5" :key="i" name="lucide:star" size="14" />
        </div>
        <blockquote class="mt-4 text-xl font-medium text-white">
          “We stream multi-gigabyte build artifacts and CAD meshes between Tokyo, Berlin, and San Francisco. FileFlow
          reduced our asset ingestion latency by 84% while giving our Infosec team cryptographically provable audit
          guarantees.”
        </blockquote>
        <figcaption class="mt-5 flex items-center gap-3">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-medium text-indigo-400">AK</span>
          <span>
            <span class="block text-sm font-medium text-white">Alexei Korolev</span>
            <span class="block text-xs text-gray-600">VP of Infrastructure, Monolith Dynamics</span>
          </span>
        </figcaption>
      </figure>
      <div class="rounded-xl border border-white/5 bg-[#0a0a0c] p-4">
        <p class="text-xs font-bold uppercase tracking-[0.08em] text-gray-600">Production outcome</p>
        <p class="mt-2 font-mono text-3xl font-bold text-emerald-400">-84%</p>
        <p class="text-sm text-white">Ingestion latency</p>
        <p class="mt-3 font-mono text-xs text-gray-600">Verified on 4,000 asset sync</p>
      </div>
    </div>
  </section>
</template>
