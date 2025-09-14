// src/data/StorageBucket.ts

export const StorageBucket = {
  UPLOAD_BIODATA: 'upload-biodata', // This should match your Supabase bucket name
  PROFILE_PHOTOS: 'profile-photos',
  DOCUMENTS: 'documents'
} as const;

export type StorageBucketType = typeof StorageBucket[keyof typeof StorageBucket];