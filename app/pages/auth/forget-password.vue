<template>
  <div>
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

        <Transition name="fade" mode="out-in">

          <!-- ── Success state ── -->
          <div v-if="emailSent" key="success" class="text-center py-4">
            <div class="flex items-center justify-center mb-5">
              <div
                class="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <icon name="ph:envelope-simple-open-bold" class="text-emerald-400 text-2xl" />
              </div>
            </div>
            <h2 class="text-xl font-semibold mb-2">Check your inbox</h2>
            <p class="text-gray-400 text-sm leading-relaxed mb-6">
              We sent a password reset link to<br />
              <span class="text-white font-medium">{{ sentToEmail }}</span>
            </p>

            <!-- Cooldown hint / resend -->
            <p class="text-xs text-gray-600 mb-4">
              Didn't receive it? Check your spam folder or
              <button class="transition-colors underline underline-offset-2"
                :class="cooldown > 0 ? 'text-gray-500 cursor-not-allowed' : 'text-indigo-400 hover:text-indigo-300'"
                :disabled="cooldown > 0" @click="handleResend">
                {{ cooldown > 0 ? `resend in ${cooldown}s` : 'resend' }}
              </button>
            </p>

            <!-- Try a different email once cooldown expires -->
            <p class="text-xs text-gray-600 mb-8">
              Wrong email?
              <button class="transition-colors underline underline-offset-2"
                :class="cooldown > 0 ? 'text-gray-500 cursor-not-allowed' : 'text-indigo-400 hover:text-indigo-300'"
                :disabled="cooldown > 0" @click="backToForm">
                {{ cooldown > 0 ? `change in ${cooldown}s` : 'use a different address' }}
              </button>
            </p>

            <nuxt-link to="/auth/login"
              class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
              <Icon name="ph:arrow-left-bold" class="text-xs transition-transform group-hover:-translate-x-1" />
              <span>Back to sign in</span>
            </nuxt-link>
          </div>

          <!-- ── Default state ── -->
          <div v-else key="form">
            <div class="text-center mb-8">
              <h1 class="text-2xl font-semibold mb-3">Forgot your password?</h1>
              <p class="text-gray-500 text-sm leading-relaxed px-4">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <!-- Rate-limit Banner -->
            <Transition name="fade">
              <div v-if="rateLimited"
                class="flex items-start gap-3 mb-6 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
                <icon name="ph:hourglass-medium-bold" class="mt-0.5 shrink-0 text-base" />
                <div>
                  <p class="font-medium">Too many requests</p>
                  <p class="text-amber-400/80 text-xs mt-0.5">
                    Supabase has temporarily blocked email sending. Please wait before trying again.
                  </p>
                </div>
              </div>

              <!-- Generic Error Banner -->
              <div v-else-if="auth.error"
                class="flex items-start gap-3 mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <icon name="ph:warning-circle-bold" class="mt-0.5 shrink-0 text-base" />
                <span>{{ auth.error }}</span>
              </div>
            </Transition>

            <!-- Form -->
            <VForm :schema="forgotSchema" @submit="handleResetRequest">
              <div class="flex flex-col gap-1">
                <VInput name="email" rules="required|email" label="Email" type="email" placeholder="name@company.com"
                  autocomplete="email" :initial-value="sentToEmail" :disabled="cooldown > 0" />

                <Transition name="fade">
                  <p v-if="cooldown > 0"
                    class="flex items-center justify-center gap-1.5 text-xs text-amber-400/90 px-1 text-center">
                    <icon name="ph:clock-countdown-bold" size="13" class="shrink-0" />
                    {{ rateLimited ? 'Sending blocked — try again in' : 'You can request another link in' }}
                    <span class="font-semibold tabular-nums">{{ cooldownMinSec }}</span>
                  </p>
                </Transition>
              </div>

              <VButton type="submit" variant="primary" :full-width="true" :loading="auth.isLoading"
                :disabled="auth.isLoading || cooldown > 0">
                <template v-if="auth.isLoading">Sending…</template>
                <template v-else>Send reset link</template>
              </VButton>
            </VForm>

            <!-- Back to Sign In -->
            <div class="mt-8 text-center">
              <nuxt-link to="/auth/login"
                class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
                <icon name="ph:arrow-left-bold" class="text-xs transition-transform group-hover:-translate-x-1" />
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
  </div>
</template>

<script lang="ts" setup>
const COOLDOWN_NORMAL = 60       // seconds after a successful send
const COOLDOWN_RATE_LIMIT = 1800 // 30 min — Supabase free plan allows only 2 emails/hour

const auth = useAuthStore()

const emailSent = ref(false)
const sentToEmail = ref('')
const cooldown = ref(0)
const rateLimited = ref(false)

let cooldownTimer: ReturnType<typeof setInterval> | null = null

function startCooldown(seconds: number) {
  rateLimited.value = seconds === COOLDOWN_RATE_LIMIT
  cooldown.value = seconds
  if (cooldownTimer) clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    cooldown.value--
    if (cooldown.value <= 0) {
      cooldown.value = 0
      rateLimited.value = false
      clearInterval(cooldownTimer!)
      cooldownTimer = null
    }
  }, 1000)
}

onUnmounted(() => {
  if (cooldownTimer) clearInterval(cooldownTimer)
})

const cooldownMinSec = computed(() => {
  const m = Math.floor(cooldown.value / 60)
  const s = cooldown.value % 60
  return m > 0 ? `${m}m ${s}s` : `${s}s`
})

const forgotSchema = {
  email: 'required|email',
}

const handleResetRequest = async (values: Record<string, unknown>) => {
  auth.clearError()
  const result = await auth.resetPassword(values.email as string)
  sentToEmail.value = values.email as string
  if (result === 'ok') {
    emailSent.value = true
    startCooldown(COOLDOWN_NORMAL)
  } else if (result === 'rate_limited') {
    startCooldown(COOLDOWN_RATE_LIMIT)
  }
}

const handleResend = async () => {
  if (cooldown.value > 0) return
  auth.clearError()
  const result = await auth.resetPassword(sentToEmail.value)
  if (result === 'ok') startCooldown(COOLDOWN_NORMAL)
  else if (result === 'rate_limited') startCooldown(COOLDOWN_RATE_LIMIT)
}

function backToForm() {
  if (cooldown.value > 0) return
  auth.clearError()
  emailSent.value = false
}

useHead({
  titleTemplate: () => 'Forget Password',
});
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