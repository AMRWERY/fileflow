export interface Invoice {
  date: string;
  description: string;
  amount: string;
  status: "PAID" | "PENDING";
}

export interface StorageDetail {
  label: string;
  value: string;
  color: string;
}
