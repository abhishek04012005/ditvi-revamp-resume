// src/types/index.ts
export interface ConfirmationDetails {
  requestNumber: string;
  mobileNumber: string;
  modelNumber: string;
  type: string;
  name?: string;
  profileUrl?: string;
  biodataUrl?: string;
  uploadDate?: string;
}