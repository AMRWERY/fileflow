export const useAuthPasswordStore = defineStore('auth/password', () => {
  const toast = useToast()

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const clearError = () => {
    error.value = null
  }

  /** Static stub — no email is sent. */
  const resetPassword = async (_email: string): Promise<'ok' | 'error'> => {
    toast.success('Reset link sent', 'Check your inbox for the password reset link.')
    return 'ok'
  }

  return {
    isLoading,
    error,
    clearError,
    resetPassword,
  }
})
