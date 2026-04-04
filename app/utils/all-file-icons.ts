export function getFileIcon(type: string) {
  const icons: Record<string, string> = {
    folder: "ph:folder-fill",
    pdf: "ph:file-pdf-duotone",
    zip: "ph:file-archive-duotone",
    video: "ph:video-camera-duotone",
    sheet: "ph:table-duotone",
    image: "ph:image-duotone",
  };
  return icons[type] ?? "ph:file-duotone";
}

export function getIconColor(type: string) {
  const colors: Record<string, string> = {
    folder: "text-indigo-400",
    pdf: "text-blue-400",
    zip: "text-orange-400",
    video: "text-red-400",
    sheet: "text-emerald-400",
    image: "text-purple-400",
  };
  return colors[type] ?? "text-gray-400";
}

export function iconBgClass(type: string) {
  return getIconColor(type).replace("text-", "bg-");
}
