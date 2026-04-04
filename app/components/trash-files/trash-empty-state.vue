<template>
  <div class="flex flex-col items-center justify-center py-32 text-center">
    <div
      class="w-20 h-20 bg-[#121214] rounded-3xl flex items-center justify-center mb-6 border border-white/5 shadow-2xl relative overflow-hidden group">
      <div class="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      </div>
      <icon name="ph:trash-duotone" class="text-gray-700 relative z-10" size="40" />
    </div>
    <h2 class="text-xl font-bold text-gray-400">Your trash is empty</h2>
    <p class="text-gray-600 text-sm mt-3 font-medium max-w-[240px] leading-relaxed italic">Items you delete will stay
      here
      for 30 days.</p>
  </div>
</template>

<script lang="ts" setup>

</script>