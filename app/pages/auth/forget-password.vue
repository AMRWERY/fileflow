<template>
  <div class="flex flex-col items-center justify-center p-6">
    <!-- Header / Logo Area -->
    <div class="flex flex-col items-center gap-3 mb-10">
      <div
        class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)]">
        <icon name="ph:cloud-bold" class="text-white text-xl" />
      </div>
      <span class="text-xl font-bold tracking-tight">FileFlow</span>
    </div>

    <!-- Card -->
    <VCard class="w-full max-w-[440px]">

      <!-- ── Success state ── -->
      <Transition name="fade" mode="out-in">
        <div v-if="emailSent" class="text-center py-4">
          <div class="flex items-center justify-center mb-5">
            <div class="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Icon name="ph:envelope-simple-open-bold" class="text-emerald-400 text-2xl" />
            </div>
          </div>
          <h2 class="text-xl font-semibold mb-2">Check your inbox</h2>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            We sent a password reset link to<br />
            <span class="text-white font-medium">{{ sentToEmail }}</span>
          </p>
          <p class="text-xs text-gray-600 mb-8">
            Didn't receive it? Check your spam folder or
            <button
              class="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
              @click="handleResend">
              resend
            </button>
          </p>
          <nuxt-link
            to="/auth/login"
            class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
            <Icon name="ph:arrow-left-bold" class="text-xs transition-transform group-hover:-translate-x-1" />
            <span>Back to sign in</span>
          </nuxt-link>
        </div>

        <!-- ── Default state ── -->
        <div v-else>
          <div class="text-center mb-8">
            <h1 class="text-2xl font-semibold mb-3">Forgot your password?</h1>
            <p class="text-gray-500 text-sm leading-relaxed px-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          <!-- Error Banner -->
          <Transition name="fade">
            <div
              v-if="auth.error"
              class="flex items-start gap-3 mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <Icon name="ph:warning-circle-bold" class="mt-0.5 shrink-0 text-base" />
              <span>{{ auth.error }}</span>
            </div>
          </Transition>

          <!-- Form -->
          <VForm :schema="forgotSchema" @submit="handleResetRequest">
            <VInput
              name="email"
              rules="required|email"
              label="Email"
              type="email"
              placeholder="name@company.com"
              autocomplete="email" />

            <VButton type="submit" variant="primary" :full-width="true" :loading="auth.isLoading">
              {{ auth.isLoading ? 'Sending...' : 'Send reset link' }}
            </VButton>
          </VForm>

          <!-- Back to Sign In -->
          <div class="mt-8 text-center">
            <nuxt-link
              to="/auth/login"
              class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
              <Icon name="ph:arrow-left-bold" class="text-xs transition-transform group-hover:-translate-x-1" />
              <span>Back to sign in</span>
            </nuxt-link>
          </div>
        </div>
      </Transition>
    </VCard>

    <!-- Security Footer -->
    <div class="mt-10 flex items-center gap-2 text-gray-600 text-[10px] tracking-[0.2em] font-bold">
      <icon name="ph:lock-key-bold" size="12" />
      Protected by 256-bit encryption
    </div>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuthStore()

const emailSent = ref(false)
const sentToEmail = ref('')

const forgotSchema = {
  email: 'required|email',
}

const handleResetRequest = async (values: Record<string, unknown>) => {
  auth.clearError()
  const success = await auth.resetPassword(values.email as string)
  if (success) {
    sentToEmail.value = values.email as string
    emailSent.value = true
  }
}

const handleResend = async () => {
  auth.clearError()
  await auth.resetPassword(sentToEmail.value)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
