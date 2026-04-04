<template>
  <div class="bg-[#121214] border border-white/5 rounded-2xl p-3 flex items-center justify-between mb-12">
    <div class="flex items-center gap-6 overflow-x-auto no-scrollbar">
      <div v-for="member in members" :key="member.id"
        class="flex items-center gap-3 pe-6 border-e border-white/5 last:border-0 shrink-0">
        <img :src="member.avatar" class="w-9 h-9 rounded-xl bg-gray-800 p-0.5 border border-white/10" />
        <div class="flex flex-col">
          <span class="text-sm font-bold text-gray-200">{{ member.name }}</span>
          <span :class="getRoleClass(member.role)"
            class="text-[8px] font-black w-fit px-1.5 py-0.5 rounded border mt-0.5 tracking-widest">
            {{ member.role }}
          </span>
        </div>
      </div>
    </div>
    <VButton variant="ghost" size="sm" class="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400">
      <icon name="ph:user-plus-bold" size="14" />
      Invite Member
    </VButton>
  </div>
</template>

<script lang="ts" setup>
import type { Member } from '~/types/team-space'

defineProps<{
  members: Member[]
}>()

const getRoleClass = (role: string) => {
  if (role === 'ADMIN') return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
  if (role === 'EDITOR') return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
  return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
};
</script>