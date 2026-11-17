<template>
  <div class="min-h-screen bg-[#0a0a0c] font-sans text-gray-400 selection:bg-indigo-500/30">
    <LandingNavbar />
    <main>
      <LandingHero />
      <LandingFeatures />
      <LandingStats />
      <LandingComparison />
      <LandingTestimonial />
      <LandingPricing />
      <LandingCta />
    </main>
    <LandingFooter />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: false })
useHead({ title: 'FileFlow — The High-Performance Cockpit for Enterprise Files' })
</script>
