<template>
  <div>
    <div class="max-w-3xl mx-auto space-y-12 pb-20">
      <!-- Profile Header -->
      <section class="flex items-center justify-between">
        <div class="flex items-center gap-6">
          <div class="relative group">
            <div class="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-indigo-500/20">
              <img :src="avatarUrl" class="w-full h-full bg-[#121214] object-cover" alt="Profile" />
            </div>
            <button
              class="absolute -bottom-2 -end-2 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center border-4 border-[#0a0a0c] hover:bg-indigo-500 transition-colors">
              <Icon name="ph:pencil-simple-fill" size="14" />
            </button>
          </div>
          <div>
            <h1 class="text-2xl font-bold tracking-tight">{{ displayName }}</h1>
            <p class="text-sm text-gray-500">{{ email }}</p>
          </div>
        </div>
        <VButton variant="ghost" size="sm">
          Edit Avatar
        </VButton>
      </section>

      <!-- Personal Information -->
      <section>
        <div class="flex items-center gap-3 mb-6">
          <Icon name="ph:user-bold" class="text-gray-500" />
          <h2 class="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">Personal Information</h2>
        </div>
        <div class="bg-[#121214] border border-white/5 rounded-2xl p-8 space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <VInput v-model="firstName" label="First Name" />
            <VInput v-model="lastName" label="Last Name" />
          </div>
          <VInput v-model="role" label="Role" />
        </div>
      </section>

      <!-- Storage Management -->
      <section>
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <Icon name="ph:cloud-bold" class="text-gray-500" />
            <h2 class="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">Storage Management</h2>
          </div>
          <button
            class="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest transition-colors">Change
            Plan</button>
        </div>
        <div class="bg-[#121214] border border-white/5 rounded-2xl p-8">
          <div class="flex items-end justify-between mb-6">
            <div class="flex items-baseline gap-2">
              <span class="text-3xl font-bold">128.4</span>
              <span class="text-gray-500 text-sm font-medium">GB of 512 GB used</span>
            </div>
            <span
              class="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg text-[10px] font-black uppercase tracking-widest">25%
              Used</span>
          </div>

          <!-- Segmented Progress Bar -->
          <div class="h-3 w-full bg-[#0e0e11] rounded-full flex overflow-hidden mb-8">
            <div v-for="item in storageData" :key="item.label" :class="item.color" :style="{ width: item.width }">
            </div>
          </div>

          <div class="grid grid-cols-4 gap-4">
            <div v-for="item in storageData" :key="item.label" class="space-y-1">
              <div class="flex items-center gap-2">
                <div :class="['w-2 h-2 rounded-full', item.color]"></div>
                <span class="text-[10px] font-black text-gray-500 uppercase tracking-widest">{{ item.label }}</span>
              </div>
              <p class="text-xs font-bold ms-4">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Security & Privacy -->
      <section>
        <div class="flex items-center gap-3 mb-6">
          <Icon name="ph:lock-key-bold" class="text-gray-500" />
          <h2 class="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">Security & Privacy</h2>
        </div>
        <div class="bg-[#121214] border border-white/5 rounded-2xl p-8 space-y-10">
          <!-- Password -->
          <div class="space-y-4">
            <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ms-1">Change Password</label>
            <div class="grid grid-cols-2 gap-4">
              <VPasswordInput placeholder="New Password" />
              <VPasswordInput placeholder="Confirm Password" />
            </div>
          </div>

          <!-- 2FA Toggle -->
          <div class="flex items-center justify-between py-6 border-y border-white/5">
            <div>
              <p class="text-sm font-bold text-gray-200">Two-Factor Authentication</p>
              <p class="text-xs text-gray-500 mt-1">Secure your account with an additional security layer.</p>
            </div>
            <button @click="twoFactor = !twoFactor" :class="twoFactor ? 'bg-indigo-600' : 'bg-gray-700'"
              class="w-11 h-6 rounded-full relative transition-colors">
              <div :class="twoFactor ? 'translate-x-6' : 'translate-x-1'"
                class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
            </button>
          </div>

          <!-- Active Sessions -->
          <div class="space-y-6">
            <label class="text-[10px] font-black text-gray-500 uppercase tracking-widest ms-1">Active Sessions</label>
            <div v-for="session in sessions" :key="session.device" class="flex items-center justify-between group">
              <div class="flex items-center gap-4">
                <div
                  class="w-10 h-10 bg-[#0e0e11] border border-white/5 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-indigo-400 transition-colors">
                  <Icon :name="session.icon" size="20" />
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-200">{{ session.device }}</p>
                  <p class="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{{ session.location }} •
                    {{ session.status }}</p>
                </div>
              </div>
              <button
                :class="session.current ? 'text-indigo-400 bg-indigo-500/10' : 'text-red-400/60 hover:text-red-400 hover:bg-red-500/10'"
                class="px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                {{ session.current ? 'Current' : 'Terminate' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Notifications -->
      <section>
        <div class="flex items-center gap-3 mb-6">
          <Icon name="ph:bell-bold" class="text-gray-500" />
          <h2 class="text-sm font-bold uppercase tracking-[0.2em] text-gray-400">Notification Preferences</h2>
        </div>
        <div class="bg-[#121214] border border-white/5 rounded-2xl p-8 space-y-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <Icon name="ph:envelope-bold" class="text-gray-500" size="20" />
              <span class="text-sm font-bold text-gray-200">Email Notifications</span>
            </div>
            <button @click="emailNotifications = !emailNotifications"
              :class="emailNotifications ? 'bg-indigo-600' : 'bg-gray-700'"
              class="w-11 h-6 rounded-full relative transition-colors">
              <div :class="emailNotifications ? 'translate-x-6' : 'translate-x-1'"
                class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
            </button>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <Icon name="ph:device-mobile-bold" class="text-gray-500" size="20" />
              <span class="text-sm font-bold text-gray-200">Push Notifications</span>
            </div>
            <button @click="pushNotifications = !pushNotifications"
              :class="pushNotifications ? 'bg-indigo-600' : 'bg-gray-700'"
              class="w-11 h-6 rounded-full relative transition-colors">
              <div :class="pushNotifications ? 'translate-x-6' : 'translate-x-1'"
                class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
            </button>
          </div>
        </div>
      </section>

      <!-- Footer Action -->
      <div class="flex justify-end pt-8">
        <VButton variant="primary" class="px-10 py-3.5 shadow-indigo-500/20 active:scale-95">
          Save Changes
        </VButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuthStore()
const supabaseUser = useSupabaseUser()

const displayName = computed(() => {
  if (auth.profile?.full_name) return auth.profile.full_name;
  const meta = supabaseUser.value?.user_metadata;
  if (meta?.full_name) return meta.full_name;
  if (meta?.name) return meta.name;
  return supabaseUser.value?.email?.split('@')[0] || 'User';
})

const email = computed(() => auth.profile?.email || supabaseUser.value?.email || '')
const avatarUrl = computed(() => auth.profile?.avatar_url || supabaseUser.value?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName.value}`)

const firstName = ref(displayName.value.split(' ')[0] || '');
const lastName = ref(displayName.value.split(' ').slice(1).join(' ') || '');
const role = ref('User');

watch(displayName, (newVal) => {
  if (!firstName.value) firstName.value = newVal.split(' ')[0];
  if (!lastName.value) lastName.value = newVal.split(' ').slice(1).join(' ');
}, { immediate: true });

onMounted(async () => {
  if (!auth.profile && supabaseUser.value) {
    await auth.fetchProfile()
  }
})

const twoFactor = ref(true);
const emailNotifications = ref(true);
const pushNotifications = ref(true);

// Storage Data
const storageData = [
  { label: 'Images', value: '48.2 GB', color: 'bg-indigo-500', width: '35%' },
  { label: 'Documents', value: '32.1 GB', color: 'bg-purple-400', width: '25%' },
  { label: 'Video', value: '18.5 GB', color: 'bg-orange-400', width: '15%' },
  { label: 'Other', value: '11.8 GB', color: 'bg-gray-600', width: '10%' },
];

const sessions = [
  { device: 'MacBook Pro 16" - Chrome', location: 'Dubai, UAE', status: 'Active Now', current: true, icon: 'ph:desktop-bold' },
  { device: 'iPhone 15 Pro - App', location: 'Abu Dhabi, UAE', status: '2 hours ago', current: false, icon: 'ph:device-mobile-bold' },
];

useHead({
  titleTemplate: () => 'Profile',
});

definePageMeta({
  layout: 'dashboard',
})
</script>