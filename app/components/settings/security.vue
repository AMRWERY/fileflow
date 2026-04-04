<template>
  <div>
    <div class="space-y-16">
      <section class="space-y-8">
        <!-- Header -->
        <header class="mb-4">
          <h2 class="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">Security</h2>
          <p class="text-sm text-gray-400">Manage your account security and monitor activity.</p>
        </header>

        <!-- 2FA Recommendation Banner -->
        <section
          class="bg-[#121214] border-s-4 border-indigo-500 rounded-xl p-6 flex items-center justify-between shadow-xl">
          <div class="flex items-center gap-5">
            <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
              <icon name="ph:shield-check-duotone" size="28" />
            </div>
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h3 class="text-base font-bold text-gray-100">Two-Factor Authentication</h3>
                <span
                  class="text-[9px] font-black bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded uppercase tracking-widest">Recommended</span>
              </div>
              <p class="text-xs text-gray-500 leading-relaxed">Add an extra layer of security to your account by
                requiring a code from your phone at log in.</p>
            </div>
          </div>
          <div class="flex items-center gap-6">
            <button class="text-xs font-bold text-gray-400 hover:text-white transition-colors">Setup 2FA</button>
            <!-- Toggle -->
            <button @click="is2faEnabled = !is2faEnabled" :class="is2faEnabled ? 'bg-indigo-600' : 'bg-zinc-700'"
              class="w-10 h-5 rounded-full relative transition-colors">
              <div :class="is2faEnabled ? 'translate-x-5' : 'translate-x-1'"
                class="absolute top-1 w-3 h-3 bg-white rounded-full transition-transform"></div>
            </button>
          </div>
        </section>

        <!-- Active Sessions -->
        <section class="bg-[#121214] border border-white/5 rounded-[20px] p-8">
          <div class="mb-8">
            <h3 class="text-sm font-bold text-gray-200">Active Sessions</h3>
            <p class="text-[11px] text-gray-600 font-medium mt-1 uppercase tracking-widest">Devices currently logged
              into your account</p>
          </div>

          <div class="space-y-8">
            <div v-for="session in activeSessions" :key="session.device"
              class="flex items-center justify-between group">
              <div class="flex items-center gap-4">
                <div
                  class="w-10 h-10 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-center text-gray-500 group-hover:text-indigo-400 transition-colors">
                  <icon :name="session.icon" size="20" />
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <p class="text-sm font-bold text-gray-300">{{ session.device }}</p>
                    <span v-if="session.isCurrent"
                      class="text-[9px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-1.5 py-0.5 rounded-md">Current
                      Session</span>
                  </div>
                  <p class="text-[10px] text-gray-600 font-bold uppercase tracking-tighter mt-0.5">{{
                    session.location
                  }} • {{ session.browser }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <span v-if="session.isCurrent" class="text-[11px] font-medium text-gray-500">Active Now</span>
                <button v-else
                  class="px-4 py-2 bg-red-500/5 hover:bg-red-500/10 text-red-500 border border-red-500/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Terminate</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Security Log -->
        <section class="bg-[#121214] border border-white/5 rounded-[20px] p-8">
          <div class="mb-8">
            <h3 class="text-sm font-bold text-gray-200">Security Log</h3>
            <p class="text-[11px] text-gray-600 font-medium mt-1 uppercase tracking-widest">Recent access attempts
              and
              system changes</p>
          </div>

          <table class="w-full text-start">
            <thead class="border-b border-white/5">
              <tr class="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                <th class="pb-4 font-black">Date & Time</th>
                <th class="pb-4 font-black">IP Address</th>
                <th class="pb-4 font-black">Location</th>
                <th class="pb-4 font-black">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/[0.02]">
              <tr v-for="log in securityLogs" :key="log.date"
                class="text-xs group hover:bg-white/[0.01] transition-colors">
                <td class="py-5 font-medium text-gray-400">{{ log.date }}</td>
                <td class="py-5 font-mono text-gray-500">{{ log.ip }}</td>
                <td class="py-5 text-gray-400">{{ log.location }}</td>
                <td class="py-5">
                  <div class="flex items-center gap-2" :class="log.color">
                    <icon name="ph:circle-fill" size="6" />
                    <span class="font-bold uppercase tracking-wider text-[10px]">{{ log.status }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            class="w-full text-center text-[10px] font-black text-indigo-400/80 hover:text-indigo-400 uppercase tracking-[0.2em] mt-6 transition-colors">View
            Full History</button>
        </section>

        <!-- Bottom Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Password Management -->
          <div class="bg-[#121214] border border-white/5 rounded-[20px] p-8 flex flex-col justify-between">
            <div>
              <h3 class="text-sm font-bold text-gray-200 mb-1">Password Management</h3>
              <p class="text-xs text-gray-600 font-medium leading-relaxed">Last changed on August 12, 2023 (72 days
                ago).</p>
            </div>
            <VButton class="mt-8 w-full" :loading="isResetting" @click="handlePasswordReset">
              Change Password
            </VButton>
          </div>

          <!-- Account Recovery -->
          <div class="bg-[#121214] border border-white/5 rounded-[20px] p-8 space-y-6">
            <h3 class="text-sm font-bold text-gray-200">Account Recovery</h3>
            <div class="space-y-6">
              <div class="flex items-center justify-between group">
                <div class="flex items-center gap-3">
                  <icon name="ph:envelope-duotone" size="18"
                    class="text-gray-600 group-hover:text-indigo-400 transition-colors" />
                  <div>
                    <p class="text-[10px] font-black text-gray-600 uppercase tracking-widest">Recovery Email</p>
                    <p class="text-xs font-bold text-gray-300">al***9@gmail.com</p>
                  </div>
                </div>
                <button
                  class="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest underline underline-offset-4 decoration-white/10">Update</button>
              </div>
              <div class="flex items-center justify-between group">
                <div class="flex items-center gap-3">
                  <icon name="ph:key-duotone" size="18"
                    class="text-gray-600 group-hover:text-indigo-400 transition-colors" />
                  <div>
                    <p class="text-[10px] font-black text-gray-600 uppercase tracking-widest">Backup Codes</p>
                    <p class="text-xs font-bold text-gray-300">10 codes remaining</p>
                  </div>
                </div>
                <button
                  class="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest underline underline-offset-4 decoration-white/10">View
                  Codes</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Warning -->
        <footer class="bg-red-500/[0.03] border border-red-500/10 rounded-2xl p-6 flex items-center gap-4">
          <icon name="ph:warning-circle-duotone" class="text-red-500/60" size="20" />
          <p class="text-[11px] font-medium text-red-500/50 leading-relaxed uppercase tracking-widest">
            Critical Security Notice: Deactivating 2FA or changing your password will terminate all active sessions
            to
            result after 24 hours for your protection.
          </p>
        </footer>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuthStore();
const supabaseUser = useSupabaseUser();
const isResetting = ref(false);

const handlePasswordReset = async () => {
  if (supabaseUser.value?.email) {
    isResetting.value = true;
    await auth.resetPassword(supabaseUser.value.email);
    isResetting.value = false;
  }
}

const is2faEnabled = ref(false);

const activeSessions = [
  {
    device: 'MacBook Pro 16"',
    browser: 'Google Chrome',
    location: 'San Francisco, USA',
    status: 'Active now',
    isCurrent: true,
    icon: 'ph:desktop-duotone'
  },
  {
    device: 'iPhone 15 Pro',
    browser: 'iOS App',
    location: 'San Francisco, USA',
    status: '2 hours ago',
    isCurrent: false,
    icon: 'material-symbols:phone-iphone-outline'
  }
];

const securityLogs = [
  { date: 'Oct 24, 2023 18:52', ip: '192.168.1.104', location: 'San Francisco, US', status: 'Success', color: 'text-indigo-400' },
  { date: 'Oct 23, 2023 20:15', ip: '45.221.80.22', location: 'London, UK', status: 'Failed', color: 'text-orange-400' },
  { date: 'Oct 22, 2023 21:04', ip: '192.168.1.104', location: 'San Francisco, US', status: 'Success', color: 'text-indigo-400' },
];
</script>