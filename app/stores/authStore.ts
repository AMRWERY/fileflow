import type { SupabaseClient, User } from '@supabase/supabase-js'
import type { Profile } from '../types/database.types'

// Supabase composables are provided at runtime by @nuxtjs/supabase via Nuxt auto-imports
declare function useSupabaseClient(): SupabaseClient
declare function useSupabaseUser(): Ref<User | null>

// ─── Error message map ────────────────────────────────────────────────────────

const AUTH_ERROR_MAP: Record<string, string> = {
  'Invalid login credentials': 'Invalid email or password. Please try again.',
  'Email not confirmed': 'Please check your inbox and verify your email before signing in.',
  'User already registered': 'An account with this email already exists.',
  'Password should be at least 6 characters': 'Password must be at least 6 characters long.',
  'Unable to validate email address: invalid format': 'Please enter a valid email address.',
  'Email rate limit exceeded': 'Too many attempts. Please wait a few minutes and try again.',
  'signup_disabled': 'New registrations are temporarily disabled.',
  'over_email_send_rate_limit': 'Too many requests. Please wait a few minutes and try again.',
  'request rate limit reached': 'Too many requests. Please wait a few minutes and try again.',
}

function formatAuthError(message: string): string {
  return AUTH_ERROR_MAP[message] ?? message
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient()
  const supabaseUser = useSupabaseUser()
  const toast = useToast()

  const profile = ref<Profile | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const clearError = () => {
    error.value = null
  }

  // ─── Profile ──────────────────────────────────────────────────────────────

  const fetchProfile = async (): Promise<Profile | null> => {
    const uid = supabaseUser.value?.id
    if (!uid) return null
    try {
      await $fetch('/api/auth/ensure-profile', { method: 'POST', credentials: 'include' })
    } catch {
      /* row may already exist; continue to select */
    }
    const { data, error: err } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .single()
    if (err) {
      // console.error('[auth] fetchProfile error:', err.message)
      return null
    }

    profile.value = data as Profile
    return profile.value
  }

  // ─── Email / Password ─────────────────────────────────────────────────────

  const login = async (email: string, password: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password })
      if (err) throw err
      await fetchProfile()
      toast.success('Welcome back!', 'You have signed in successfully.')
      await navigateTo('/dashboard')
      return true
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      error.value = formatAuthError(msg)
      toast.error('Sign in failed', error.value ?? msg)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
  ): Promise<'confirm_email' | 'ok' | 'error'> => {
    isLoading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      })
      if (err) throw err
      // Supabase returns a session immediately only when email confirmation is OFF.
      // When confirmation is ON, session is null and the user must verify their email.
      if (data.session) {
        await fetchProfile()
        toast.success('Account created!', 'Welcome to FileFlow.')
        await navigateTo('/dashboard')
        return 'ok'
      }
      toast.info('Check your inbox', 'A confirmation link has been sent to your email.')
      return 'confirm_email'
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      error.value = formatAuthError(msg)
      toast.error('Sign up failed', error.value ?? msg)
      return 'error'
    } finally {
      isLoading.value = false
    }
  }

  // ─── OAuth (Google only) ──────────────────────────────────────────────────

  const loginWithGoogle = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    try {
      // @nuxtjs/supabase exposes a /confirm page that exchanges the OAuth code for a session.
      // After confirming, it redirects to the `callback` URL set in nuxt.config (→ /dashboard).
      const redirectTo = `${window.location.origin}/confirm`
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      if (err) throw err
      // Browser will redirect — keep isLoading true until redirect completes
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'OAuth sign-in failed.'
      error.value = formatAuthError(msg)
      isLoading.value = false
    }
  }

  // ─── Password Reset ───────────────────────────────────────────────────────

  const resetPassword = async (email: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    try {
      const redirectTo = `${window.location.origin}/auth/reset-password`
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
      if (err) throw err
      toast.success('Reset link sent', 'Check your inbox for the password reset link.')
      return true
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      error.value = formatAuthError(msg)
      toast.error('Request failed', error.value ?? msg)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // ─── Logout ───────────────────────────────────────────────────────────────

  const logout = async (): Promise<void> => {
    isLoading.value = true
    try {
      await supabase.auth.signOut()
      profile.value = null
      await navigateTo('/auth/login')
    } finally {
      isLoading.value = false
    }
  }

  // ─── Computed ─────────────────────────────────────────────────────────────

  const isAuthenticated = computed(() => !!supabaseUser.value)

  const storagePercentage = computed(() => {
    if (!profile.value) return 0
    return Math.round((profile.value.storage_used / profile.value.storage_quota) * 100)
  })

  return {
    profile,
    isLoading,
    error,
    isAuthenticated,
    storagePercentage,
    clearError,
    fetchProfile,
    login,
    signUp,
    loginWithGoogle,
    resetPassword,
    logout,
  }
})
