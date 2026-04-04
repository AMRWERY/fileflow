export interface StatCardsProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: string;
  iconBgClass: string;
  iconColorClass: string;
  trend?: string;
  trendIcon?: string;
  trendColorClass?: string;
  subtitle?: string;
  hasProgress?: boolean;
  progress?: number;
}
