<template>
  <header
    class="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md z-10 shrink-0"
  >
    <div class="flex items-center gap-4 min-w-0">
      <VBackButton />
      <h1 class="text-sm font-bold text-white tracking-tight truncate">{{ filename }}</h1>
    </div>

    <div class="flex items-center gap-3 shrink-0">
      <VButton
        v-if="downloadUrl"
        variant="secondary"
        size="sm"
        type="button"
        class="flex items-center gap-2 !px-4 !py-2 !rounded-xl !text-xs !font-bold"
        @click="onDownload"
      >
        <icon name="ph:download-simple-bold" size="18" />
        Download
      </VButton>

      <VButton
        v-if="fileId"
        variant="secondary"
        size="sm"
        type="button"
        :disabled="copying"
        class="flex items-center gap-2 !px-4 !py-2 !rounded-xl !text-xs !font-bold"
        @click="onCopyLink"
      >
        <icon
          :name="copying ? 'ph:spinner-gap-bold' : 'ph:link-bold'"
          size="18"
          :class="copying ? 'animate-spin' : ''"
        />
        {{ copying ? 'Creating…' : 'Copy link' }}
      </VButton>
    </div>
  </header>
</template>

<script lang="ts" setup>
const props = defineProps<{
  filename: string
  fileId?: string
  downloadUrl?: string | null
}>()

const toast = useToast()
const copying = ref(false)

/** Clipboard after `await $fetch` often fails (user gesture expired); use fallback. */
function copyTextToClipboard(text: string): boolean {
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.top = '0'
    ta.style.left = '0'
    ta.style.width = '1px'
    ta.style.height = '1px'
    ta.style.opacity = '0'
    ta.style.pointerEvents = 'none'
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    ta.setSelectionRange(0, text.length)
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

function fetchErrorMessage(e: unknown): string {
  if (!e || typeof e !== 'object') return ''
  const err = e as Record<string, unknown>
  if (typeof err.statusMessage === 'string' && err.statusMessage) return err.statusMessage
  const d = err.data as Record<string, unknown> | undefined
  if (d) {
    if (typeof d.statusMessage === 'string' && d.statusMessage) return d.statusMessage
    if (typeof d.message === 'string' && d.message) return d.message
  }
  if (typeof err.message === 'string' && err.message) return err.message
  return ''
}

async function onDownload() {
  const url = props.downloadUrl
  if (!url) return

  try {
    const res = await fetch(url, { mode: 'cors' })
    if (!res.ok) throw new Error(String(res.status))
    const blob = await res.blob()
    const obj = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = obj
    a.download = props.filename || 'download'
    a.rel = 'noopener'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(obj)
  } catch {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

async function onCopyLink() {
  const id = props.fileId
  if (!id || copying.value) return

  copying.value = true
  let shareUrl = ''
  try {
    const res = await $fetch<{ url: string }>(`/api/files/${encodeURIComponent(String(id))}/share`, {
      method: 'POST',
      credentials: 'include',
    })
    shareUrl = res.url
  } catch (e: unknown) {
    toast.error('Could not create link', fetchErrorMessage(e) || 'Request failed.')
    return
  } finally {
    copying.value = false
  }

  let copied = false
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareUrl)
      copied = true
    }
  } catch {
    copied = false
  }
  if (!copied) copied = copyTextToClipboard(shareUrl)

  if (copied) {
    toast.success('Link copied', 'Share link is on your clipboard.')
  } else {
    toast.warning('Copy manually', shareUrl)
  }
}
</script>
