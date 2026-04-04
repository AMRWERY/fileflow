<template>
  <div>
    <div class="relative" ref="notifRef">
      <button @click="notifOpen = !notifOpen"
        class="relative text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5">
        <Icon name="ph:bell-duotone" size="22" />
        <span v-if="unreadCount > 0"
          class="absolute top-1 end-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0c]"></span>
      </button>

      <!-- Notifications Dropdown -->
      <Transition enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-1" enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-1">
        <div v-if="notifOpen"
          class="absolute end-0 top-12 w-80 bg-[#111113] border border-white/[0.07] rounded-2xl shadow-2xl shadow-black/40 z-50 overflow-hidden">
          <div class="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <span class="text-sm font-bold text-white">Notifications</span>
            <button @click="markAllRead"
              class="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Mark all read
            </button>
          </div>
          <div class="divide-y divide-white/[0.04] max-h-72 overflow-y-auto">
            <div v-for="notif in notifications" :key="notif.id" @click="notif.unread = false" :class="[
              'flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors',
              notif.unread ? 'bg-indigo-500/[0.04] hover:bg-indigo-500/[0.07]' : 'hover:bg-white/[0.02]',
            ]">
              <div :class="[
                'w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
                notif.iconBg,
              ]">
                <Icon :name="notif.icon" size="16" :class="notif.iconColor" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-xs font-semibold text-white leading-snug">{{ notif.title }}</p>
                <p class="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{{ notif.message }}</p>
                <p class="text-[10px] text-gray-600 mt-1">{{ notif.time }}</p>
              </div>
              <div v-if="notif.unread" class="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></div>
            </div>
          </div>
          <div class="px-4 py-3 border-t border-white/5 text-center">
            <button class="text-[11px] text-gray-500 hover:text-gray-300 font-medium transition-colors">
              View all notifications
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
const notifRef = ref<HTMLElement | null>(null)
const notifOpen = ref(false)

const notifications = ref([
  {
    id: 1,
    title: 'File shared with you',
    message: 'Sarah shared "Q4 Report.pdf" with you',
    time: '2 min ago',
    icon: 'ph:share-network-duotone',
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-400',
    unread: true,
  },
  {
    id: 2,
    title: 'Upload complete',
    message: 'Demo_Walkthrough.mp4 was uploaded successfully',
    time: '1 hour ago',
    icon: 'ph:check-circle-duotone',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-400',
    unread: true,
  },
  {
    id: 3,
    title: 'Storage warning',
    message: "You've used 80% of your storage limit",
    time: 'Yesterday',
    icon: 'ph:warning-duotone',
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-400',
    unread: false,
  },
])

const unreadCount = computed(
  () => notifications.value.filter((n) => n.unread).length
)

const markAllRead = () => {
  notifications.value.forEach((n) => (n.unread = false))
}
</script>