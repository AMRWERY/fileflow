export interface BreadcrumbItem {
  label: string;
  /** Omit for the current page (rendered as plain text) */
  to?: string;
}
