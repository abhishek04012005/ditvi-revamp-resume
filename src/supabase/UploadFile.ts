// src/supabase/UploadFile.ts

import  {StorageBucketType} from '../data/StorageBucket';
import { supabase } from './Supabase';

interface UploadFileParams {
  file: File;
  requestNumber: string;
  folderName: StorageBucketType;
}

export const UploadFile = async ({
  file,
  requestNumber,
  folderName,
}: UploadFileParams): Promise<string> => {
  try {
    console.log('Starting file upload:', {
      fileName: file.name,
      requestNumber,
      folderName
    });

    const fileExt = file.name.split('.').pop() || '';
    const fileName = `${requestNumber}.${fileExt}`;
    const filePath = `${folderName}/${fileName}`;

    // Upload file to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from(folderName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(folderName)
      .getPublicUrl(filePath);

    if (!publicUrl) {
      throw new Error('Failed to get public URL');
    }

    console.log('Upload successful:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Error in UploadFile:', error);
    throw error;
  }
};