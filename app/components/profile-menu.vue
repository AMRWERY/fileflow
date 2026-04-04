<template>
  <div>
    <div class="relative ps-4 border-s border-white/5" ref="profileRef">
      <button @click="profileOpen = !profileOpen"
        class="flex items-center gap-3 rounded-xl hover:bg-white/[0.03] p-1.5 transition-colors">
        <div class="text-end">
          <p class="text-sm font-bold text-white leading-none mb-1">{{ displayName }}</p>
          <p class="text-[10px] text-indigo-400 font-bold tracking-tighter">
            Pro Plan
          </p>
        </div>
        <img v-if="avatarUrl" :src="avatarUrl" alt="Avatar"
          class="w-10 h-10 rounded-xl object-cover bg-indigo-900/20 border border-white/10" />
        <div v-else
          class="w-10 h-10 rounded-xl bg-indigo-600/20 border border-white/10 flex items-center justify-center text-indigo-400 font-bold text-sm">
          {{ displayName.charAt(0).toUpperCase() }}
        </div>
      </button>

      <!-- Profile Dropdown -->
      <Transition enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-1" enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-1">
        <div v-if="profileOpen"
          class="absolute end-0 top-16 w-56 bg-[#111113] border border-white/[0.07] rounded-2xl shadow-2xl shadow-black/40 z-50 overflow-hidden">
          <!-- User Info -->
          <div class="px-4 py-3.5 border-b border-white/5">
            <p class="text-sm font-bold text-white">{{ displayName }}</p>
            <p class="text-[11px] text-gray-500 mt-0.5">{{ displayEmail }}</p>
          </div>

          <!-- Menu Items -->
          <div class="p-2">
            <template v-for="item in profileMenu" :key="item.label">
              <NuxtLink v-if="item.to" :to="item.to" @click="item.action" :class="[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors text-start',
                item.danger
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5',
              ]">
                <Icon :name="item.icon" size="16" />
                {{ item.label }}
              </NuxtLink>
              <button v-else @click="item.action" :class="[
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors text-start',
                item.danger
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5',
              ]">
                <Icon :name="item.icon" size="16" />
                {{ item.label }}
              </button>
            </template>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuthStore()
const supabaseUser = useSupabaseUser()

const profileOpen = ref(false)
const profileRef = ref<HTMLElement | null>(null)

const profileMenu = [
  {
    label: 'My Profile',
    icon: 'ph:user-duotone',
    action: () => { profileOpen.value = false },
    danger: false,
    to: '/profile'
  },
  {
    label: 'Settings',
    icon: 'ph:gear-duotone',
    action: () => { profileOpen.value = false },
    danger: false,
    to: '/settings'
  },
  {
    label: 'Sign Out',
    icon: 'ph:sign-out-duotone',
    action: () => auth.logout(),
    danger: true,
  },
]

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
})

const handleOutsideClick = (e: MouseEvent) => {
  if (profileRef.value && !profileRef.value.contains(e.target as Node)) {
    profileOpen.value = false
  }
}

// Fetch profile on mount in case of page refresh
onMounted(async () => {
  if (!auth.profile && supabaseUser.value) {
    await auth.fetchProfile()
  }
  document.addEventListener('click', handleOutsideClick)
})

// profile.full_name → user_metadata.full_name (OAuth) → email prefix → 'User'
const displayName = computed(() => {
  if (auth.profile?.full_name) return auth.profile.full_name
  const meta = supabaseUser.value?.user_metadata
  if (meta?.full_name) return meta.full_name
  if (meta?.name) return meta.name
  return supabaseUser.value?.email?.split('@')[0] || 'User'
})

const displayEmail = computed(() =>
  auth.profile?.email || supabaseUser.value?.email || ''
)

const avatarUrl = computed(() =>
  auth.profile?.avatar_url || supabaseUser.value?.user_metadata?.avatar_url || null
)
</script>