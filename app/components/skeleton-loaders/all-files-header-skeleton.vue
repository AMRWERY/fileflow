<template>
  <div class="flex flex-col gap-2 mb-8">
    <!-- Breadcrumb row -->
    <div class="flex items-center gap-2">
      <skeleton-shimmer-block class="h-3.5 w-10 rounded-md" />
      <span class="text-white/[0.06] text-xs">/</span>
      <skeleton-shimmer-block class="h-3.5 w-20 rounded-md" />
    </div>

    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <skeleton-shimmer-block class="h-9 w-44 sm:w-56 rounded-lg" />

      <div class="flex flex-wrap items-center gap-3">
        <skeleton-shimmer-block class="h-10 w-full sm:w-64 rounded-xl" />
        <skeleton-shimmer-block class="h-10 w-[4.5rem] rounded-xl" />
        <skeleton-shimmer-block class="h-10 w-[5.5rem] rounded-xl" />
        <skeleton-shimmer-block class="h-10 w-[5.5rem] rounded-xl" />
      </div>
    </div>
  </div>
</template>
