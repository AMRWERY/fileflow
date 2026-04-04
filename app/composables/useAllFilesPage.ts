import { useFilesStore } from '~/stores/filesStore';

export function useAllFilesPage() {
  const store = useFilesStore();
  const { files, folders, isLoading, error, hasRootListingFetched } = storeToRefs(store);

  const filterQuery = ref("");
  const viewMode = ref<"grid" | "list">("grid");

  // Always fetch on the client after mount — the server handles auth.
  // Do NOT guard by user.value?.id here: in @nuxtjs/supabase v2 the session
  // restoration is async, so user.value can still be null at onMounted time
  // even when the user is logged in, causing fetchContents to never run.
  onMounted(() => {
    store.fetchContents(null)
  })

  const displayFiles = computed(() => {
    // Combine folders and files
    const allItems = [...folders.value, ...files.value];

    const q = filterQuery.value.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter((f) => f.name.toLowerCase().includes(q));
  });

  const selectedCount = computed(() => {
    return displayFiles.value.filter((f) => f.selected).length;
  });

  const toggleSelection = (id: string | number) => {
    // We look in files and folders refs inside store to toggle locally
    // If you need global toggle, we should move it to store. For now, local mutation is fine if they are refs
    const item = files.value.find((f) => f.id === id) || folders.value.find((f) => f.id === id);
    if (item) item.selected = !item.selected;
  };

  const clearSelection = () => {
    files.value.forEach((f) => f.selected = false);
    folders.value.forEach((f) => f.selected = false);
  };

  return {
    filterQuery,
    viewMode,
    displayFiles,
    selectedCount,
    toggleSelection,
    clearSelection,
    isLoading,
    error,
    hasRootListingFetched,
    store
  };
}
