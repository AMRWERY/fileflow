<template>
  <div class="flex flex-col items-center justify-center p-6 text-white font-sans">
    <!-- Logo Header -->
    <div class="flex items-center gap-2 mb-8">
      <div
        class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
        <icon name="ph:cloud-bold" class="text-white text-xl" />
      </div>
      <span class="text-xl font-semibold tracking-tight">FileFlow</span>
    </div>

    <!-- Main Card -->
    <VCard class="w-full max-w-[440px]">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold mb-2">Welcome back</h1>
        <p class="text-gray-400 text-sm">Sign in to your account</p>
      </div>

      <!-- Error Banner -->
      <Transition name="fade">
        <div v-if="auth.error"
          class="flex items-start gap-3 mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          <icon name="ph:warning-circle-bold" class="mt-0.5 shrink-0 text-base" />
          <span>{{ auth.error }}</span>
        </div>
      </Transition>

      <!-- Social Logins -->
      <div class="mb-8">
        <VButton variant="ghost" class="w-full" :loading="oauthLoading === 'google'" @click="handleGoogle">
          <icon name="logos:google-icon" />
          Continue with Google
        </VButton>
      </div>

      <!-- Divider -->
      <VDivider text="or continue with email" class="mb-8" />

      <!-- Form -->
      <VForm :schema="loginSchema" @submit="handleLogin">
        <VInput name="email" rules="required|email" label="Email" type="email" placeholder="name@company.com"
          autocomplete="email" />

        <VPasswordInput name="password" rules="required|min:8" label="Password" :show-strength-meter="false"
          autocomplete="current-password" />

        <div class="flex justify-end">
          <nuxt-link to="/auth/forget-password" class="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
            Forgot password?
          </nuxt-link>
        </div>

        <VButton type="submit" variant="primary" :full-width="true" :loading="auth.isLoading">
          {{ auth.isLoading ? 'Signing in...' : 'Sign In' }}
        </VButton>
      </VForm>

      <!-- Footer -->
      <p class="text-center text-sm text-gray-500 mt-8">
        Don't have an account?
        <nuxt-link to="/auth/sign-up" class="text-indigo-400 hover:text-indigo-300 font-medium ms-1">
          Sign up
        </nuxt-link>
      </p>
    </VCard>

    <!-- Security Note -->
    <div class="mt-8 flex items-center gap-2 text-gray-600 text-[11px] tracking-widest font-medium">
      <icon name="material-symbols:lock-outline" />
      Protected by 256-bit encryption
    </div>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuthStore()
const oauthLoading = ref<'google' | null>(null)

const loginSchema = {
  email: 'required|email',
  password: 'required|min:8',
}

const handleLogin = async (values: Record<string, unknown>) => {
  auth.clearError()
  await auth.login(values.email as string, values.password as string)
}

const handleGoogle = async () => {
  auth.clearError()
  oauthLoading.value = 'google'
  await auth.loginWithGoogle()
  oauthLoading.value = null
}

useHead({
  titleTemplate: () => 'Login',
});
</script>