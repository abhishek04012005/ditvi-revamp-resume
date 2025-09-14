// src/types/dashboard.ts
export interface LeadMagnetEntry {
  id: string;
  name: string;
  mobileNumber: string;
  submittedAt: string;
  modelNumber: string;
  language: string;
  type: string;
  amount: number;
  status: 'pending' | 'sent' | 'failed';
}

export interface LeadMagnetStats {
  total: number;
  today: number;
  pending: number;
  sent: number;
}