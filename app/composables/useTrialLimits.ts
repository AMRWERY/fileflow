/**
 * Free-trial limits. A trial user can browse every page, but write actions are
 * restricted so the product can be evaluated without full access.
 */
export type TrialFeature = 'delete' | 'share' | 'invite' | 'purge' | 'upload' | 'folder'

export const TRIAL_LIMITS = {
  /** Max files a trial user can upload */
  uploads: 5,
  /** Max folders a trial user can create */
  folders: 3,
} as const

const LABELS: Record<TrialFeature, string> = {
  delete: 'Deleting files and folders',
  share: 'Share links',
  invite: 'Inviting team members',
  purge: 'Permanently deleting items',
  upload: `Uploading more than ${TRIAL_LIMITS.uploads} files`,
  folder: `Creating more than ${TRIAL_LIMITS.folders} folders`,
}

/** Features that are fully blocked during the trial (the rest are capped). */
const BLOCKED: TrialFeature[] = ['delete', 'share', 'invite', 'purge']

export function useTrialLimits() {
  const session = useAuthSessionStore()
  const toast = useToast()
  // Counters live in the Pinia store so this also works outside component setup
  const { uploadsUsed, foldersUsed } = storeToRefs(session)

  const deny = (feature: TrialFeature) => {
    toast.warning('Not available on the free trial', `${LABELS[feature]} requires a paid plan.`)
    return false
  }

  /** Returns true if the action may proceed; otherwise shows an upgrade notice. */
  const allow = (feature: TrialFeature): boolean => {
    if (!session.isTrial) return true
    if (BLOCKED.includes(feature)) return deny(feature)
    if (feature === 'upload' && uploadsUsed.value >= TRIAL_LIMITS.uploads) return deny(feature)
    if (feature === 'folder' && foldersUsed.value >= TRIAL_LIMITS.folders) return deny(feature)
    return true
  }

  /** Call after a capped action succeeded. */
  const record = (feature: 'upload' | 'folder') => {
    if (!session.isTrial) return
    if (feature === 'upload') uploadsUsed.value++
    else foldersUsed.value++
  }

  return { isTrial: computed(() => session.isTrial), allow, record }
}
