import type { SupabaseClient, User } from '@supabase/supabase-js'
import type { Profile } from '../../types/database.types'

declare function useSupabaseClient(): SupabaseClient
declare function useSupabaseUser(): Ref<User | null>

export const useAuthProfileStore = defineStore('auth/profile', () => {
  const supabase = useSupabaseClient()
  const supabaseUser = useSupabaseUser()

  const profile = ref<Profile | null>(null)

  // ─── Fetch / hydrate ────────────────────────────────────────────────────────

  const fetchProfile = async (): Promise<Profile | null> => {
    const uid = supabaseUser.value?.id
    if (!uid) return null
    try {
      await $fetch('/api/auth/ensure-profile', { method: 'POST', credentials: 'include' })
    } catch {
      /* row may already exist; continue to select */
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .single()
    if (error) return null
    profile.value = data as Profile
    return profile.value
  }

  // ─── Computed ───────────────────────────────────────────────────────────────

  const storagePercentage = computed(() => {
    if (!profile.value) return 0
    return Math.round((profile.value.storage_used / profile.value.storage_quota) * 100)
  })

  return {
    profile,
    fetchProfile,
    storagePercentage,
  }
})
