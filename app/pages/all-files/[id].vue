<template>
  <div class="flex h-screen overflow-hidden bg-[#0a0a0c] text-gray-300 font-sans">
    <!-- Main Preview Area -->
    <div class="flex-1 flex flex-col relative min-w-0">
      <preview-header :filename="currentFileName" />

      <preview-viewport v-model:zoom="zoomLevel" :preview-url="previewUrl" title="hero work"
        subtitle="Construction line" />
    </div>

    <!-- Right Sidebar -->
    <preview-sidebar :file-details="fileDetails" :uploader="uploader" :tags="tags" :versions="versions"
      :activity="activity" />
  </div>
</template>

<script lang="ts" setup>
const zoomLevel = ref(82);

const currentFileName = 'hero_banner_final.png'
const previewUrl = '/img/preview-img.avif'

const uploader = {
  name: 'Alex Rivera',
  avatar: 'AR'
}

const fileDetails = [
  { label: 'Type', value: 'PNG Image' },
  { label: 'Size', value: '12.4 MB' },
  { label: 'Dimensions', value: '3840 x 2160' },
  { label: 'Created', value: 'Oct 12, 2023' },
  { label: 'Modified', value: 'Oct 24, 2023' },
];

const tags = ref(['Marketing', 'High-Res', 'Q4-Campaign']);

const versions = [
  { id: 'v2', date: 'Oct 20, 14:32', size: '11.8 MB' },
  { id: 'v1', date: 'Oct 12, 09:15', size: '10.2 MB' },
];

const activity = [
  {
    id: 1,
    user: 'Alex Rivera',
    action: 'updated the file',
    time: '2 hours ago',
    icon: 'ph:pencil-simple-line-fill',
    iconBg: 'bg-indigo-500/20',
    iconColor: 'text-indigo-400'
  },
  {
    id: 2,
    user: 'Sarah Connor',
    action: 'shared a link',
    time: 'Yesterday, 10:22',
    icon: 'ph:share-network-fill',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400'
  },
];

definePageMeta({
  layout: 'dashboard',
})
</script>