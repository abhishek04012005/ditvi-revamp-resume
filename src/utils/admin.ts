// src/types/admin.ts
import { FlowType } from "@/data/flowtype";

export interface LeadMagnetEntry {
  id: number;
  created_at: string;
  request_number: string;
  flow_type: FlowType;
  user_details: {
    name: string;
    mobileNumber: string;
  };
  model_details: {
    modelNumber: string;
    language: string;
    type: string;
    amount: number;
  };
  status: Array<{
    id: number;
    created: string;
  }>;
  completed: boolean;
  deleted: boolean;
}

export interface LeadMagnetStats {
  total: number;
  today: number;
  completed: number;
  pending: number;
}

export interface FilterOptions {
  status: 'all' | 'completed' | 'pending';
  dateRange: 'all' | 'today' | 'week' | 'month';
  flowType: FlowType | 'all';
}