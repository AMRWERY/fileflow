<template>
  <div>
    <div class="space-y-16">
      <section class="space-y-8">
        <div class="space-y-6">
          <!-- Workspace Name -->
          <VInput v-model="workspaceName" label="Workspace Name" />

          <!-- Workspace URL -->
          <div class="space-y-1 mt-6">
            <label class="text-[11px] font-bold text-gray-500 tracking-wider mb-2 ms-1">Workspace URL</label>
            <div class="relative group">
              <VInput v-model="workspaceUrl" />
              <button
                class="absolute end-2 top-1/2 -translate-y-1/2 p-2 bg-[#1c1c1f] hover:bg-[#252529] rounded-lg transition-colors border border-white/5 z-10">
                <Icon name="ph:copy-bold" size="14" class="text-gray-400" />
              </button>
            </div>
          </div>

          <!-- Dropdowns Grid -->
          <div class="grid grid-cols-3 gap-6">
            <div class="space-y-3">
              <label class="text-xs font-bold text-gray-400">Default View</label>
              <div class="relative">
                <select v-model="defaultView"
                  class="w-full appearance-none bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none pe-10 hover:border-white/10 transition-colors">
                  <option>Grid</option>
                  <option>List</option>
                </select>
                <Icon name="ph:caret-down-bold"
                  class="absolute end-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size="14" />
              </div>
            </div>

            <div class="space-y-3">
              <label class="text-xs font-bold text-gray-400">Language</label>
              <div class="relative">
                <select v-model="language"
                  class="w-full appearance-none bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none pe-10 hover:border-white/10 transition-colors">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
                <Icon name="ph:caret-down-bold"
                  class="absolute end-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size="14" />
              </div>
            </div>

            <div class="space-y-3">
              <label class="text-xs font-bold text-gray-400">Timezone</label>
              <div class="relative">
                <select v-model="timezone"
                  class="w-full appearance-none bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none pe-10 hover:border-white/10 transition-colors text-ellipsis overflow-hidden whitespace-nowrap">
                  <option>UTC (Coordinated Universal Time)</option>
                </select>
                <Icon name="ph:caret-down-bold"
                  class="absolute end-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size="14" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer Actions -->
      <div class="flex items-center justify-end gap-6 pt-8">
        <button class="text-sm font-bold text-gray-500 hover:text-white transition-colors">Discard</button>
        <VButton>Save Changes</VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const workspaceName = ref("Amr's Workspace");
const workspaceUrl = ref("fileflow.io/amr");
const defaultView = ref("Grid");
const language = ref("English");
const timezone = ref("UTC (Coordinated Universal Time)");
</script>