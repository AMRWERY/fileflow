<template>
  <div class="flex flex-col items-center justify-center p-6">
    <!-- Logo -->
    <div class="flex items-center gap-2 mb-10">
      <div
        class="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)]">
        <icon name="ph:cloud-bold" class="text-white text-xl" />
      </div>
      <span class="text-xl font-bold tracking-tight">FileFlow</span>
    </div>

    <VCard class="w-full max-w-[460px]">
      <Transition name="fade" mode="out-in">

        <!-- ── Check your email state ── -->
        <div v-if="confirmationSent" key="confirm" class="text-center py-4">
          <div class="flex items-center justify-center mb-5">
            <div
              class="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <icon name="ph:envelope-simple-open-bold" class="text-emerald-400 text-2xl" />
            </div>
          </div>
          <h2 class="text-xl font-semibold mb-2">Check your inbox</h2>
          <p class="text-gray-400 text-sm leading-relaxed mb-1">We sent a confirmation link to</p>
          <p class="text-white font-medium text-sm mb-6">{{ registeredEmail }}</p>
          <p class="text-xs text-gray-600 mb-8">
            Click the link in the email to activate your account.<br />
            Didn't get it? Check your spam folder.
          </p>
          <nuxt-link to="/auth/login"
            class="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            <icon name="ph:arrow-left-bold" class="text-xs" />
            Back to sign in
          </nuxt-link>
        </div>

        <!-- ── Registration form ── -->
        <div v-else key="form">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-semibold mb-2">Create your account</h1>
            <p class="text-gray-500 text-sm">Start uploading in seconds. No credit card required.</p>
          </div>

          <!-- Error Banner -->
          <Transition name="fade">
            <div v-if="auth.error"
              class="flex items-start gap-3 mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <Ic on name="ph:warning-circle-bold" class="mt-0.5 shrink-0 text-base" />
              <span>{{ auth.error }}</span>
            </div>
          </Transition>

          <!-- Social Auth -->
          <div class="mb-8">
            <VButton variant="ghost" class="w-full" :loading="oauthLoading === 'google'" @click="handleGoogle">
              <icon name="logos:google-icon" />
              <span class="text-gray-300">Continue with Google</span>
            </VButton>
          </div>

          <!-- Divider -->
          <VDivider text="or continue with email" class="mb-8" />

          <!-- Form -->
          <VForm :schema="signUpSchema" @submit="handleSignUp">
            <VInput name="fullName" rules="required|min:2" label="Full Name" type="text" placeholder="Alex Rivera"
              autocomplete="name" />
            <VInput name="email" rules="required|email" label="Email" type="email" placeholder="name@company.com"
              autocomplete="email" />
            <VPasswordInput name="password" rules="required|min:8" label="Password" :show-strength-meter="true"
              autocomplete="new-password" />

            <!-- Terms -->
            <div class="flex items-start gap-3 py-2">
              <div class="relative flex items-center h-5">
                <input v-model="agreeToTerms" type="checkbox" id="terms"
                  class="w-4 h-4 rounded bg-[#1c1c1f] border-white/10 text-indigo-600 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer" />
              </div>
              <label for="terms" class="text-xs text-gray-400 leading-normal cursor-pointer">
                I agree to the
                <nuxt-link to=""
                  class="text-gray-300 hover:text-white underline underline-offset-4 decoration-white/20">Terms of
                  Service</nuxt-link>
                and
                <nuxt-link to=""
                  class="text-gray-300 hover:text-white underline underline-offset-4 decoration-white/20">Privacy
                  Policy</nuxt-link>
              </label>
            </div>

            <VButton type="submit" variant="primary" :full-width="true" :disabled="!agreeToTerms"
              :loading="auth.isLoading" class="mt-2">
              {{ auth.isLoading ? 'Creating account...' : 'Create Account' }}
            </VButton>
          </VForm>

          <p class="text-center text-sm text-gray-500 mt-8">
            Already have an account?
            <nuxt-link to="/auth/login" class="text-indigo-400 hover:text-indigo-300 font-semibold ms-1">Sign
              in</nuxt-link>
          </p>
        </div>
      </Transition>
    </VCard>

    <!-- Page Footer -->
    <div class="mt-12 flex flex-col items-center gap-4">
      <div class="flex items-center gap-2 text-gray-600 text-[10px] tracking-[0.2em] font-bold">
        <icon name="ph:lock-key-bold" size="12" />
        Protected by 256-bit encryption
      </div>
      <div class="flex gap-6">
        <nuxt-link to=""
          class="text-[10px] tracking-widest text-gray-600 hover:text-gray-400 font-bold transition-colors">
          Privacy Policy
        </nuxt-link>
        <nuxt-link to=""
          class="text-[10px] tracking-widest text-gray-600 hover:text-gray-400 font-bold transition-colors">
          Terms of Service
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuthStore()

const agreeToTerms = ref(false)
const oauthLoading = ref<'google' | null>(null)
const confirmationSent = ref(false)
const registeredEmail = ref('')

const signUpSchema = {
  fullName: 'required|min:2',
  email: 'required|email',
  password: 'required|min:8',
}

const handleSignUp = async (values: Record<string, unknown>) => {
  if (!agreeToTerms.value) return
  auth.clearError()
  const result = await auth.signUp(
    values.email as string,
    values.password as string,
    values.fullName as string,
  )
  if (result === 'confirm_email') {
    registeredEmail.value = values.email as string
    confirmationSent.value = true
  }
}

const handleGoogle = async () => {
  auth.clearError()
  oauthLoading.value = 'google'
  await auth.loginWithGoogle()
  oauthLoading.value = null
}

useHead({
  titleTemplate: () => 'Sign Up',
});
</script>