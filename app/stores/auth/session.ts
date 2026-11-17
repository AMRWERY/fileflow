import type { SupabaseClient, User } from '@supabase/supabase-js'
import { formatAuthError } from './_errors'

declare function useSupabaseClient(): SupabaseClient
declare function useSupabaseUser(): Ref<User | null>

export const useAuthSessionStore = defineStore('auth/session', () => {
  const supabase = useSupabaseClient()
  const supabaseUser = useSupabaseUser()
  const toast = useToast()

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const clearError = () => {
    error.value = null
  }

  const isAuthenticated = computed(() => !!supabaseUser.value)

  // ─── Email / Password login ─────────────────────────────────────────────────

  const login = async (email: string, password: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    try {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password })
      if (err) throw err
      await useAuthProfileStore().fetchProfile()
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

  // ─── Sign up ────────────────────────────────────────────────────────────────

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
        options: { data: { full_name: fullName } },
      })
      if (err) throw err
      if (data.session) {
        await useAuthProfileStore().fetchProfile()
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

  // ─── OAuth (Google) ─────────────────────────────────────────────────────────

  const loginWithGoogle = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    try {
      const redirectTo = `${window.location.origin}/confirm`
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: { access_type: 'offline', prompt: 'consent' },
        },
      })
      if (err) throw err
      // Browser redirects — keep isLoading true until navigation completes
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'OAuth sign-in failed.'
      error.value = formatAuthError(msg)
      isLoading.value = false
    }
  }

  // ─── Logout ─────────────────────────────────────────────────────────────────

  const logout = async (): Promise<void> => {
    isLoading.value = true
    try {
      await supabase.auth.signOut()
      useAuthProfileStore().profile = null
      await navigateTo('/auth/login')
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    isAuthenticated,
    clearError,
    login,
    signUp,
    loginWithGoogle,
    logout,
  }
})
