<template>
  <aside :class="[
    'w-64 border-e border-white/5 bg-[#0a0a0c] flex flex-col p-6 fixed h-full z-20',
    'transition-transform duration-200 ease-in-out',
    'lg:translate-x-0',
    isOpen ? 'translate-x-0' : '-translate-x-full',
  ]">
    <!-- Logo -->
    <div class="mb-10">
      <div class="flex items-center gap-2 mb-1">
        <span class="text-xl font-bold text-white tracking-tight">FileFlow</span>
      </div>
      <p class="text-[10px] tracking-[0.2em] font-bold text-gray-600">
        Enterprise Storage
      </p>
    </div>

    <!-- Navigation -->
    <div class="space-y-8 flex-1">
      <!-- Files Section -->
      <div>
        <h3 class="text-[11px] font-bold text-gray-600 tracking-widest mb-4 ms-2">
          Files
        </h3>
        <nav class="space-y-1">
          <template v-for="item in navItems" :key="item.label">
            <nuxt-link v-if="item.to" :to="item.to" :class="navLinkClass(isRouteActive(item.to))"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group">
              <icon :name="item.icon" size="20" :class="isRouteActive(item.to)
                ? 'text-indigo-400'
                : 'group-hover:text-gray-300'
                " />
              <span class="text-sm font-medium">{{ item.label }}</span>
            </nuxt-link>
            <span v-else class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500" title="Coming soon"
              aria-disabled="true">
              <icon :name="item.icon" size="20" class="text-gray-500" />
              <span class="text-sm font-medium">{{ item.label }}</span>
            </span>
          </template>
        </nav>
      </div>

      <!-- Spaces Section -->
      <div>
        <h3 class="text-[11px] font-bold text-gray-600 tracking-widest mb-4 ms-2">
          Spaces
        </h3>
        <nav class="space-y-1">
          <template v-for="item in spaceItems" :key="item.label">
            <nuxt-link v-if="item.to" :to="item.to" :class="navLinkClass(isRouteActive(item.to))"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group">
              <icon :name="item.icon" size="20" :class="isRouteActive(item.to)
                ? 'text-indigo-400'
                : 'group-hover:text-gray-300'
                " />
              <span class="text-sm font-medium">{{ item.label }}</span>
            </nuxt-link>
            <span v-else class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500" title="Coming soon"
              aria-disabled="true">
              <icon :name="item.icon" size="20" class="text-gray-500" />
              <span class="text-sm font-medium">{{ item.label }}</span>
            </span>
          </template>
        </nav>
      </div>
    </div>

    <!-- Storage Footer -->
    <div class="pt-6 border-t border-white/5">
      <div class="flex justify-between text-[11px] mb-2 font-bold tracking-wider">
        <span class="flex items-center gap-1.5 text-gray-400">
          <icon name="ph:cloud-fill" size="14" /> Storage
        </span>
        <span class="text-white">46%</span>
      </div>
      <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-3">
        <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[46%] rounded-full"></div>
      </div>
      <p class="text-[10px] text-gray-600 font-medium">2.3 GB of 5 GB used</p>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const route = useRoute()
const { isOpen } = useSidebar()

function isRouteActive(to: string) {
  if (!to) return false
  const path = route.path
  if (path === to) return true
  if (to !== '/' && path.startsWith(`${to}/`)) return true
  return false
}

function navLinkClass(active: boolean) {
  return active
    ? 'bg-white/5 text-white'
    : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
}

const navItems = [
  { label: 'Dashboard', icon: 'ph:grid-four-fill', to: '/dashboard' },
  { label: 'All Files', icon: 'solar:folder-with-files-bold', to: '/all-files' },
  { label: 'Recent', icon: 'ph:clock-duotone', to: '/recent-files' },
  { label: 'Starred', icon: 'ph:star-duotone', to: '/starred-files' },
  { label: 'Shared', icon: 'ph:share-network-duotone', to: '/shared-files' },
  { label: 'Trash', icon: 'ph:trash-duotone', to: '/trash-files' },
]

const spaceItems = [
  { label: 'Personal Space', icon: 'ph:user-duotone', to: '/personal-space' },
  { label: 'Team Space', icon: 'ph:users-three-duotone', to: '/team-space' },
]
</script>