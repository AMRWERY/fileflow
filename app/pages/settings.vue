<template>
  <div class="flex gap-16 items-start">
    <!-- Sticky: title + tab nav stay visible while the right column scrolls -->
    <aside class="w-48 shrink-0 sticky top-0 self-start z-10 pt-1">
      <h1 class="text-3xl font-bold tracking-tight mb-10">Settings</h1>
      <nav class="flex flex-col gap-1">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="[
          activeTab === tab
            ? 'bg-[#1c1c1f] text-white font-semibold'
            : 'text-gray-500 hover:text-gray-300 transition-colors'
        ]" class="text-start px-4 py-2.5 rounded-xl text-sm">
          {{ tab }}
        </button>
      </nav>
    </aside>

    <!-- Main Content (scrolls with dashboard main region) -->
    <div class="flex-1 max-w-3xl min-w-0">
      <Transition name="fade" mode="out-in">
        <component :is="activeComponent" :key="activeTab" />
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SettingsGeneral from '~/components/settings/general.vue'
import SettingsAccount from '~/components/settings/account.vue'
import SettingsAppearance from '~/components/settings/appearance.vue'
import SettingsTeam from '~/components/settings/team.vue'
import SettingsSecurity from '~/components/settings/security.vue'
import SettingsBilling from '~/components/settings/billings.vue'

const activeTab = ref('General');
const tabs = ['General', 'Account', 'Appearance', 'Team', 'Security', 'Billing'] as const;
type TabType = typeof tabs[number];

const componentsMap = {
  General: SettingsGeneral,
  Account: SettingsAccount,
  Appearance: SettingsAppearance,
  Team: SettingsTeam,
  Security: SettingsSecurity,
  Billing: SettingsBilling
};

const activeComponent = computed(() => {
  return componentsMap[activeTab.value as TabType];
});

useHead({
  titleTemplate: () => 'Settings',
});

definePageMeta({
  layout: 'dashboard',
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>