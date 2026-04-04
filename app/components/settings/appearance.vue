<template>
  <div>
    <div class="space-y-16">
      <!-- Appearance Section -->
      <section class="space-y-8">
        <!-- Theme Selection -->
        <div class="space-y-4">
          <label class="text-xs font-bold text-gray-400">Theme</label>
          <div class="flex w-fit bg-black border border-white/5 p-1 rounded-[14px]">
            <button v-for="t in ['Light', 'Dark', 'System']" :key="t" @click="selectTheme(t)"
              :class="theme === t ? 'bg-[#2a2a2e] text-white' : 'text-gray-500 hover:text-gray-300'"
              class="px-6 py-2 rounded-xl text-xs font-semibold transition-all">
              {{ t }}
            </button>
          </div>
        </div>

        <!-- Accent Colors and Compact Mode -->
        <div class="flex items-end justify-between">
          <div class="space-y-4">
            <label class="text-xs font-bold text-gray-400">Accent Color</label>
            <div class="flex items-center gap-3">
              <button @click="selectAccent('indigo')" :class="accentColor === 'indigo' ? 'ring-2 ring-white/20' : ''"
                class="w-10 h-10 rounded-xl bg-indigo-500 transition-all hover:scale-110 active:scale-95"></button>
              <button @click="selectAccent('orange')" :class="accentColor === 'orange' ? 'ring-2 ring-white/20' : ''"
                class="w-10 h-10 rounded-xl bg-orange-400 transition-all hover:scale-110 active:scale-95"></button>
              <button @click="selectAccent('purple')" :class="accentColor === 'purple' ? 'ring-2 ring-white/20' : ''"
                class="w-10 h-10 rounded-xl bg-purple-300 transition-all hover:scale-110 active:scale-95"></button>
              <button @click="selectAccent('white')" :class="accentColor === 'white' ? 'ring-2 ring-white/20' : ''"
                class="w-10 h-10 rounded-xl bg-white transition-all hover:scale-110 active:scale-95"></button>
              <button class="ms-2 text-xs font-bold text-gray-600 hover:text-gray-400 transition-colors">
                Custom color
              </button>
            </div>
          </div>

          <!-- Compact Mode Toggle Card -->
          <div class="bg-[#121214] border border-white/5 rounded-2xl p-4 flex items-center gap-8 shadow-xl">
            <div>
              <p class="text-xs font-bold text-gray-200">Compact Mode</p>
              <p class="text-[10px] font-medium text-gray-600 mt-0.5">Reduce whitespace for data density</p>
            </div>
            <button @click="compactMode = !compactMode" :class="compactMode ? 'bg-indigo-600' : 'bg-gray-800'"
              class="w-11 h-6 rounded-full relative transition-colors">
              <div :class="compactMode ? 'translate-x-6' : 'translate-x-1'"
                class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"></div>
            </button>
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
const theme = ref('Dark'); // Light, Dark, System
const accentColor = ref('indigo'); // indigo, orange, purple, white
const compactMode = ref(false);

const selectTheme = (val: string) => theme.value = val;
const selectAccent = (val: string) => accentColor.value = val;
</script>