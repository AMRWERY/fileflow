<template>
  <aside class="w-[360px] bg-[#0e0e11] border-s border-white/5 flex flex-col h-full overflow-y-auto shrink-0">
    <preview-details :details="fileDetails" :uploader="uploader" />

    <preview-tags :tags="tags" />

    <preview-share share-url="fileflow.co/s/4k2j..." expiry="Expires in 2d" />

    <preview-versions :versions="versions" current-version="3" />

    <preview-activity :activity="activity" />

    <preview-comments />
  </aside>
</template>

<script lang="ts" setup>
defineProps<{
  fileDetails: any[]
  uploader: any
  tags: string[]
  versions: any[]
  activity: any[]
}>()
</script>