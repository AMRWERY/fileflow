import type { Profile } from '../../types/database.types'
import { MOCK_PROFILE } from '~/data/mock'

export const useAuthProfileStore = defineStore('auth/profile', () => {
  const profile = ref<Profile | null>({ ...MOCK_PROFILE })

  const fetchProfile = async (): Promise<Profile | null> => {
    const session = useAuthSessionStore()
    if (!session.user) return null
    profile.value = {
      ...MOCK_PROFILE,
      email: session.user.email,
      full_name: session.user.user_metadata.full_name,
    }
    return profile.value
  }

  const updateFullName = async (fullName: string): Promise<void> => {
    if (!profile.value) return
    profile.value = { ...profile.value, full_name: fullName, updated_at: new Date().toISOString() }
  }

  const storagePercentage = computed(() => {
    if (!profile.value) return 0
    return Math.round((profile.value.storage_used / profile.value.storage_quota) * 100)
  })

  return {
    profile,
    fetchProfile,
    updateFullName,
    storagePercentage,
  }
})
