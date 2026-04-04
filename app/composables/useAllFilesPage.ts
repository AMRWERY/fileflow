import type { FileItem } from "@/types/all-files";

const initialFiles: FileItem[] = [
  {
    id: 1,
    name: "Project Assets",
    type: "folder",
    size: "2.4 GB",
    meta: "128 items",
    selected: false,
  },
  {
    id: 2,
    name: "hero_banner_final.png",
    type: "image",
    size: "2.1 MB",
    meta: "2 hours ago",
    selected: false,
    previewUrl: "img/preview-img.avif",
  },
  {
    id: 3,
    name: "Q3_Strategic_Plan.pdf",
    type: "pdf",
    size: "450 KB",
    meta: "Yesterday",
    selected: false,
  },
  {
    id: 4,
    name: "Archive_2023_Full.zip",
    type: "zip",
    size: "1.8 GB",
    meta: "Oct 12, 2023",
    selected: false,
  },
  {
    id: 5,
    name: "Marketing Videos",
    type: "folder",
    size: "12.8 GB",
    meta: "14 items",
    selected: false,
  },
  {
    id: 6,
    name: "office_vibe_01.jpg",
    type: "image",
    size: "4.5 MB",
    meta: "3 hours ago",
    selected: false,
    previewUrl: "/img/img-01.avif",
  },
  {
    id: 7,
    name: "demo_reel_compressed.mp4",
    type: "video",
    size: "88 MB",
    meta: "1 day ago",
    selected: false,
  },
  {
    id: 8,
    name: "budget_2024_master.xlsx",
    type: "sheet",
    size: "122 KB",
    meta: "4 days ago",
    selected: false,
  },
];

export function useAllFilesPage() {
  const filterQuery = ref("");
  const viewMode = ref<"grid" | "list">("grid");
  const files = ref<FileItem[]>(structuredClone(initialFiles));

  const displayFiles = computed(() => {
    const q = filterQuery.value.trim().toLowerCase();
    if (!q) return files.value;
    return files.value.filter((f) => f.name.toLowerCase().includes(q));
  });

  const selectedCount = computed(
    () => files.value.filter((f) => f.selected).length,
  );

  const toggleSelection = (id: number) => {
    const file = files.value.find((f) => f.id === id);
    if (file) file.selected = !file.selected;
  };

  const clearSelection = () => {
    files.value.forEach((f) => {
      f.selected = false;
    });
  };

  return {
    filterQuery,
    viewMode,
    displayFiles,
    selectedCount,
    toggleSelection,
    clearSelection,
  };
}
