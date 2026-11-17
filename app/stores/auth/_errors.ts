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
  'Error sending recovery email':
    'Password reset email could not be sent. In Supabase: Authentication → Email → configure SMTP or check email rate limits.',
}

export function formatAuthError(message: string): string {
  if (AUTH_ERROR_MAP[message]) return AUTH_ERROR_MAP[message] ?? message
  const lower = message.toLowerCase()
  const key = Object.keys(AUTH_ERROR_MAP).find((k) => k.toLowerCase() === lower)
  return key ? (AUTH_ERROR_MAP[key] ?? message) : message
}
