<template>
  <header class="flex items-center justify-between">
    <!-- Hamburger (mobile) -->
    <button @click="toggle"
      class="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors me-3 shrink-0">
      <Icon name="ph:list-bold" size="22" />
    </button>

    <VSearchInput
      v-model="searchQuery"
      wrapper-class="max-w-96"
      placeholder="Search files, folders, and shared spaces…"
      show-shortcut
      aria-label="Search files, folders, and shared spaces"
    />

    <!-- Actions & Profile -->
    <div class="flex items-center gap-4">
      <!-- Notifications -->
      <notifications-menu />

      <!-- Profile -->
      <profile-menu />
    </div>
  </header>
</template>

<script lang="ts" setup>
const { toggle } = useSidebar()

const searchQuery = ref('')
</script>