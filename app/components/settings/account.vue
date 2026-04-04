<template>
  <div>
    <div class="max-w-3xl mx-auto space-y-16">
      <!-- Personal Information -->
      <section>
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ms-1">First Name</label>
              <VInput v-model="firstName" inputClass="!bg-transparent focus:!border-indigo-500/50" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ms-1">Last Name</label>
              <VInput v-model="lastName" inputClass="!bg-transparent focus:!border-indigo-500/50" />
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ms-1">Role</label>
            <VInput v-model="role" inputClass="!bg-transparent focus:!border-indigo-500/50" />
          </div>

          <div class="flex justify-end pt-2">
            <VButton @click="saveProfile" :loading="isSaving">Save Profile</VButton>
          </div>
        </div>
      </section>

      <!-- Email & Security -->
      <section>
        <div class="mb-8">
          <h2 class="text-xl font-bold">Email & Security</h2>
        </div>

        <div class="flex items-end gap-4">
          <div class="flex-1 space-y-2">
            <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest ms-1">Primary Email</label>
            <div class="relative">
              <VInput v-model="email" type="email" inputClass="!bg-transparent pe-24 opacity-70 pointer-events-none"
                readonly />
              <div
                class="absolute end-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 bg-indigo-500/10 rounded-md border border-indigo-500/20">
                <Icon name="ph:check-circle-fill" class="text-indigo-400" size="12" />
                <span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Verified</span>
              </div>
            </div>
          </div>
          <VButton variant="ghost" class="py-[14px]" @click="handlePasswordReset">
            Change Password
          </VButton>
        </div>
      </section>

      <!-- Plan & Storage -->
      <section>
        <div class="mb-8">
          <h2 class="text-xl font-bold">Plan & Storage</h2>
        </div>

        <div class="bg-[#121214] border border-white/5 rounded-2xl p-8">
          <div class="flex items-start justify-between mb-10">
            <div>
              <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Current Plan</p>
              <h3 class="text-2xl font-bold text-gray-200">Pro Individual</h3>
            </div>
            <VButton size="sm">
              Change Plan
            </VButton>
          </div>

          <div class="space-y-4">
            <div class="flex justify-between items-end">
              <p class="text-xs font-bold text-gray-500">Storage usage</p>
              <p class="text-xs font-bold text-gray-300">
                {{ usedStorage }} GB <span class="text-gray-600 font-medium">of {{ totalStorage }} GB used</span>
              </p>
            </div>
            <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div class="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                :style="{ width: storagePercentage + '%' }"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Danger Zone -->
      <section class="pt-8 border-t border-white/5">
        <div class="mb-8">
          <h2 class="text-xl font-bold text-red-500/80 mb-1">Danger Zone</h2>
          <p class="text-xs text-red-500/40">Permanently delete your account and all associated data.</p>
        </div>

        <div class="bg-red-500/[0.03] border border-red-500/10 rounded-2xl p-8 flex items-center justify-between">
          <div>
            <h4 class="text-sm font-bold text-gray-200 mb-1">Delete this account</h4>
            <p class="text-xs text-gray-600">Once you delete an account, there is no going back. Please be certain.
            </p>
          </div>
          <VButton variant="ghost" class="!text-red-500 !border-red-500/20 hover:!bg-red-500/10">
            Delete Account
          </VButton>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuthStore()
const supabaseUser = useSupabaseUser()
const supabase = useSupabaseClient()
const toast = useToast()

const firstName = ref('')
const lastName = ref('')
const role = ref('Member')
const email = ref('')
const isSaving = ref(false)

/** Same resolution order as profile-menu / dashboard — DB row can lag OAuth metadata */
const resolvedFullName = computed(() => {
  const fromProfile = auth.profile?.full_name?.trim()
  if (fromProfile) return fromProfile
  const meta = supabaseUser.value?.user_metadata
  const fromMetaFull = meta?.full_name != null ? String(meta.full_name).trim() : ''
  if (fromMetaFull) return fromMetaFull
  const fromMetaName = meta?.name != null ? String(meta.name).trim() : ''
  if (fromMetaName) return fromMetaName
  return ''
})

function applyFullNameToFields(full: string) {
  if (!full) {
    firstName.value = ''
    lastName.value = ''
    return
  }
  const parts = full.split(/\s+/).filter(Boolean)
  firstName.value = parts[0] ?? ''
  lastName.value = parts.length > 1 ? parts.slice(1).join(' ') : ''
}

watch(resolvedFullName, applyFullNameToFields, { immediate: true })

watch(
  () => auth.profile?.role,
  (r) => {
    if (r === 'admin') role.value = 'Admin'
    else if (r === 'user') role.value = 'Member'
  },
  { immediate: true },
)

watch(
  () => supabaseUser.value?.email,
  (e) => {
    if (e) email.value = e
  },
  { immediate: true },
)

onMounted(async () => {
  if (supabaseUser.value && !auth.profile) {
    await auth.fetchProfile()
  }
})

// Storage logic
const usedStorage = computed(() => {
  if (!auth.profile?.storage_used) return '0.0'
  return (auth.profile.storage_used / (1024 * 1024 * 1024)).toFixed(1)
})
const totalStorage = computed(() => {
  if (!auth.profile?.storage_quota) return '5.0'
  return (auth.profile.storage_quota / (1024 * 1024 * 1024)).toFixed(1)
})
const storagePercentage = computed(() => auth.storagePercentage)

// Handlers
const saveProfile = async () => {
  if (!supabaseUser.value) return
  isSaving.value = true
  try {
    const fullName = `${firstName.value} ${lastName.value}`.trim()
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', supabaseUser.value.id)
    if (error) throw error
    await auth.fetchProfile()
    toast.success('Profile updated', 'Your personal information has been saved successfully.')
  } catch (err: any) {
    toast.error('Failed to update', err.message || 'Something went wrong.')
  } finally {
    isSaving.value = false
  }
}

const handlePasswordReset = async () => {
  if (email.value) {
    await auth.resetPassword(email.value)
  }
}
</script>