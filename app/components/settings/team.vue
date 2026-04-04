<template>
  <div>
      <div class="max-w-4xl mx-auto space-y-12 pb-24">
        <!-- Workspace Info Header -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ms-1">Workspace Name</label>
            <VInput v-model="workspaceName" inputClass="!bg-[#121214] font-medium" />
          </div>
          <div class="space-y-2">
            <label class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ms-1">Workspace URL</label>
            <div class="relative group">
              <VInput v-model="workspaceUrl" inputClass="!bg-[#121214] font-medium pe-12" />
              <button
                class="absolute end-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/5 rounded-lg transition-colors z-10">
                <Icon name="ph:copy-bold" size="16" class="text-gray-500" />
              </button>
            </div>
          </div>
        </section>

        <!-- Team Members Section -->
        <section>
          <div class="flex items-center justify-between mb-8">
            <div>
              <h2 class="text-xl font-bold tracking-tight mb-1">Team Members</h2>
              <p class="text-xs text-gray-500">Manage who has access to this workspace and their permissions.</p>
            </div>
            <VButton variant="secondary" size="sm">
              Invite User
            </VButton>
          </div>

          <div class="bg-[#121214]/50 border border-white/5 rounded-[22px] overflow-hidden">
            <!-- Table Header -->
            <div class="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 bg-[#121214]">
              <div class="col-span-6 text-[10px] font-black text-gray-600 uppercase tracking-widest">User</div>
              <div class="col-span-2 text-[10px] font-black text-gray-600 uppercase tracking-widest">Role</div>
              <div class="col-span-3 text-[10px] font-black text-gray-600 uppercase tracking-widest">Last Active</div>
              <div class="col-span-1 text-[10px] font-black text-gray-600 uppercase tracking-widest text-end">Actions
              </div>
            </div>

            <!-- Member Rows -->
            <div v-for="member in members" :key="member.id"
              class="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-white/[0.02] transition-colors group">
              <!-- User Info -->
              <div class="col-span-6 flex items-center gap-4">
                <img :src="member.avatar" class="w-10 h-10 rounded-xl bg-[#1c1c1f] p-0.5 border border-white/5" />
                <div class="overflow-hidden">
                  <p class="text-sm font-bold text-gray-200 truncate">{{ member.name }}</p>
                  <p class="text-xs text-gray-600 truncate">{{ member.email }}</p>
                </div>
              </div>
              <!-- Role -->
              <div class="col-span-2">
                <span :class="getRoleClass(member.role)"
                  class="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border">
                  {{ member.role }}
                </span>
              </div>
              <!-- Last Active -->
              <div class="col-span-3 text-xs font-medium italic text-gray-500">
                {{ member.lastActive }}
              </div>
              <!-- Actions -->
              <div class="col-span-1 text-end">
                <button
                  class="p-2 text-gray-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 opacity-0 group-hover:opacity-100">
                  <Icon name="ph:user-minus-bold" size="18" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Team Space Permissions -->
        <section>
          <div class="mb-8">
            <h2 class="text-xl font-bold tracking-tight mb-1">Team Space Permissions</h2>
            <p class="text-xs text-gray-500">Global security and sharing settings for all members.</p>
          </div>

          <div class="space-y-4">
            <!-- Permission Card 1 -->
            <div class="bg-[#121214] border border-white/5 p-6 rounded-2xl flex items-center justify-between group">
              <div>
                <h4 class="text-sm font-bold text-gray-200 mb-1">Allow external guest sharing</h4>
                <p class="text-xs text-gray-600">Grant permission to share files with individuals outside your
                  organization.</p>
              </div>
              <button @click="allowGuestSharing = !allowGuestSharing"
                :class="allowGuestSharing ? 'bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-zinc-800'"
                class="w-11 h-6 rounded-full relative transition-all duration-300 shrink-0">
                <div :class="allowGuestSharing ? 'translate-x-6' : 'translate-x-1'"
                  class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"></div>
              </button>
            </div>

            <!-- Permission Card 2 -->
            <div class="bg-[#121214] border border-white/5 p-6 rounded-2xl flex items-center justify-between group">
              <div>
                <h4 class="text-sm font-bold text-gray-200 mb-1">Require 2FA for all members</h4>
                <p class="text-xs text-gray-600">Force two-factor authentication for all workspace accounts.</p>
              </div>
              <button @click="require2FA = !require2FA"
                :class="require2FA ? 'bg-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-zinc-800'"
                class="w-11 h-6 rounded-full relative transition-all duration-300 shrink-0">
                <div :class="require2FA ? 'translate-x-6' : 'translate-x-1'"
                  class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </section>

        <!-- Footer Actions -->
        <div
          class="fixed bottom-0 start-0 end-0 p-8 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c] to-transparent pointer-events-none">
          <div class="max-w-4xl mx-auto flex justify-end gap-6 pointer-events-auto">
            <button class="text-sm font-bold text-gray-500 hover:text-white transition-colors">Discard changes</button>
            <VButton>
              Save Changes
            </VButton>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import type { TeamMember } from '~/types/team';

const workspaceName = ref('Design Studio');
const workspaceUrl = ref('fileflow.io/design-studio');
const allowGuestSharing = ref(true);
const require2FA = ref(false);

const members = ref<TeamMember[]>([
  { id: 1, name: 'Amr Dahab', email: 'amr@fileflow.co', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amr', role: 'Admin', lastActive: 'Active now' },
  { id: 2, name: 'Julian Amawi', email: 'j.amawi@enterprise.io', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julian', role: 'Editor', lastActive: '7 hours ago' },
  { id: 3, name: 'Sarah Chen', email: 's.chen@fileflow.co', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', role: 'Viewer', lastActive: 'Yesterday' },
]);

const getRoleClass = (role: string) => {
  const styles: Record<string, string> = {
    Admin: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    Editor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Viewer: 'bg-zinc-800 text-zinc-400 border-zinc-700/50',
  };
  return styles[role] || styles.Viewer;
};
</script>