import type { SupabaseClient } from '@supabase/supabase-js'
import { formatAuthError } from './_errors'

declare function useSupabaseClient(): SupabaseClient

export const useAuthPasswordStore = defineStore('auth/password', () => {
  const supabase = useSupabaseClient()
  const toast = useToast()

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const clearError = () => {
    error.value = null
  }

  const resetPassword = async (email: string): Promise<'ok' | 'error'> => {
    isLoading.value = true
    error.value = null
    try {
      const redirectTo = `${window.location.origin}/auth/reset-password`
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
      if (err) throw err
      toast.success('Reset link sent', 'Check your inbox for the password reset link.')
      return 'ok'
    } catch (err: unknown) {
      const raw = err instanceof Error ? err.message : 'Something went wrong.'
      error.value = formatAuthError(raw)
      toast.error('Request failed', error.value ?? raw)
      return 'error'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    clearError,
    resetPassword,
  }
})
