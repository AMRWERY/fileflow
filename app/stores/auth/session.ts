import { MOCK_USER } from '~/data/mock'

type SessionUser = typeof MOCK_USER

/**
 * Static session store — no backend. A mock user is always "signed in";
 * login / signUp / logout only toggle local state and navigate.
 */
export const useAuthSessionStore = defineStore('auth/session', () => {
  const toast = useToast()

  const user = ref<SessionUser | null>({ ...MOCK_USER })
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const clearError = () => {
    error.value = null
  }

  const isAuthenticated = computed(() => !!user.value)

  const login = async (email: string, _password: string): Promise<boolean> => {
    user.value = { ...MOCK_USER, email: email || MOCK_USER.email }
    useAuthProfileStore().fetchProfile()
    toast.success('Welcome back!', 'You have signed in successfully.')
    await navigateTo('/dashboard')
    return true
  }

  const signUp = async (
    email: string,
    _password: string,
    fullName: string,
  ): Promise<'confirm_email' | 'ok' | 'error'> => {
    user.value = {
      ...MOCK_USER,
      email: email || MOCK_USER.email,
      user_metadata: { ...MOCK_USER.user_metadata, full_name: fullName || MOCK_USER.user_metadata.full_name },
    }
    useAuthProfileStore().fetchProfile()
    toast.success('Account created!', 'Welcome to FileFlow.')
    await navigateTo('/dashboard')
    return 'ok'
  }

  const loginWithGoogle = async (): Promise<void> => {
    await login(MOCK_USER.email, '')
  }

  // ─── Free trial ─────────────────────────────────────────────────────────────
  const TRIAL_DAYS = 14
  const trialEndsAt = useCookie<string | null>('ff_trial_ends', {
    maxAge: 60 * 60 * 24 * TRIAL_DAYS,
    default: () => null,
  })
  const uploadsUsed = ref(0)
  const foldersUsed = ref(0)
  const isTrial = computed(() => !!trialEndsAt.value && new Date(trialEndsAt.value) > new Date())

  /** Starts a free trial: grants a full-access trial session and opens the app. */
  const startTrial = async (email?: string): Promise<void> => {
    trialEndsAt.value = new Date(Date.now() + TRIAL_DAYS * 86_400_000).toISOString()
    user.value = { ...MOCK_USER, email: email || MOCK_USER.email }
    useAuthProfileStore().fetchProfile()
    toast.success('Free trial started', `Explore every page for ${TRIAL_DAYS} days. Some actions are limited on the trial.`)
    await navigateTo('/dashboard')
  }

  const logout = async (): Promise<void> => {
    user.value = null
    useAuthProfileStore().profile = null
    await navigateTo('/auth/login')
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    clearError,
    login,
    signUp,
    loginWithGoogle,
    startTrial,
    isTrial,
    uploadsUsed,
    foldersUsed,
    trialEndsAt,
    logout,
  }
})
