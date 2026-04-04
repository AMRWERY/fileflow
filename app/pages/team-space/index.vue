<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Main Content Area -->
    <div class="flex-1 overflow-y-auto custom-scrollbar">
      <team-space-header title="Design Studio" initials="DS" :member-count="members.length"
        :breadcrumb-items="breadcrumbItems" v-model:isSidebarOpen="isSidebarOpen" />

      <team-space-member-bar :members="members" />

      <team-space-folders :folders="folders" />

      <team-space-recent-files :files="recentFiles" />
    </div>

    <!-- Activity Sidebar -->
    <team-space-activity-sidebar :activities="activities" :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
  </div>
</template>

<script lang="ts" setup>
import type { Member, Activity, TeamFile } from '~/types/team-space'
import type { BreadcrumbItem } from '~/types/shared-components/breadcrumb'

const members = ref<Member[]>([
  { id: 1, name: 'Amr Dahab', role: 'ADMIN', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amr' },
  { id: 2, name: 'Jane Doe', role: 'EDITOR', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: 3, name: 'Steve Miller', role: 'VIEWER', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Steve' },
]);

const folders = [
  { name: 'Icons', items: 128, size: '1.2GB' },
  { name: 'Mockups', items: 64, size: '2.5GB' },
  { name: 'Branding', items: 32, size: '850MB' },
]

const recentFiles = ref<TeamFile[]>([
  { n: 'Landing_Page_v2.fig', t: 'FIGMA', s: '24.2 MB', bg: 'from-purple-900/40 to-indigo-900/40' },
  { n: 'Design_System.fig', t: 'FIGMA', s: '158.5 MB', bg: 'from-gray-800 to-gray-900' },
  { n: 'Brand_Guidelines.pdf', t: 'PDF', s: '12.8 MB', bg: 'from-blue-900/20 to-blue-800/20' },
  { n: 'Motion_Test_01.mp4', t: 'VIDEO', s: '445 MB', bg: 'from-gray-900 to-black' }
])

const activities = ref<Activity[]>([
  { id: 1, user: 'Amr', action: 'uploaded', target: 'invoice.pdf', time: '2 mins ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amr' },
  { id: 2, user: 'Jane', action: 'edited', target: 'Landing_Page_v2.fig', time: '1 hour ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: 3, user: 'Steve', action: 'shared', target: 'Mockups', time: '4 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Steve' },
  { id: 4, user: 'Jane', action: 'commented on', target: 'Icon_Set.zip', time: '6 hours ago', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane' },
  { id: 5, user: 'Amr', action: 'deleted', target: 'Draft_04.fig', time: 'Yesterday', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amr' },
  { id: 6, user: 'Steve', action: 'created', target: 'Q3_Reports folder', time: 'Yesterday', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Steve' },
]);

const isSidebarOpen = ref(false)

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Monolith', to: '/dashboard' },
  { label: 'Team Space' }
]

useHead({
  titleTemplate: () => 'Team Space',
});

definePageMeta({
  layout: 'dashboard',
})
</script>