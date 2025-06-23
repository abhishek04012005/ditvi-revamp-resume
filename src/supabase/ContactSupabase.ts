// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from './Supabase';

// Define interfaces
interface ContactUs {
  id?: number;
  name: string;
  email: string;
  mobile: string;
  message: string;
  created_at?: string;
  deleted?: boolean;
}

interface ContactUsResponse extends ContactUs {
  id: number;
  created_at: string;
  deleted: boolean;
}

class ContactUsStorageError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'ContactUsStorageError';
  }
}

export const ContactUsStorage = {
  async saveContactUs(contactUs: Omit<ContactUs, 'id' | 'created_at' | 'deleted'>): Promise<ContactUsResponse> {
    try {
      const { data, error } = await supabase
        .from('contact_us')
        .insert({
          name: contactUs.name,
          email: contactUs.email,
          mobile: contactUs.mobile,
          message: contactUs.message,
        })
        .select('*')
        .single();

      if (error) {
        throw new ContactUsStorageError('Failed to save contact message', error);
      }

      if (!data) {
        throw new ContactUsStorageError('No data returned after saving contact message');
      }

      return data as ContactUsResponse;
    } catch (error) {
      console.error('Error saving contact us:', error);
      if (error instanceof ContactUsStorageError) {
        throw error;
      }
      throw new ContactUsStorageError('Unexpected error while saving contact message', error);
    }
  },

  async getAllContactUs(): Promise<ContactUsResponse[]> {
    try {
      const { data, error } = await supabase
        .from('contact_us')
        .select('*')
        .eq('deleted', false)
        .order('created_at', { ascending: false });

      if (error) {
        throw new ContactUsStorageError('Failed to fetch contact messages', error);
      }

      if (!data) {
        return [];
      }

      return data as ContactUsResponse[];
    } catch (error) {
      console.error('Error fetching contact us:', error);
      if (error instanceof ContactUsStorageError) {
        throw error;
      }
      throw new ContactUsStorageError('Unexpected error while fetching contact messages', error);
    }
  },

  async deleteContactUsById(id: number): Promise<ContactUsResponse> {
    try {
      const { data, error } = await supabase
        .from('contact_us')
        .update({ deleted: true })
        .eq('id', id)
        .select('*')
        .single();

      if (error) {
        throw new ContactUsStorageError(`Failed to delete contact message with ID: ${id}`, error);
      }

      if (!data) {
        throw new ContactUsStorageError(`No data returned after deleting contact message with ID: ${id}`);
      }

      return data as ContactUsResponse;
    } catch (error) {
      console.error('Error deleting contact us:', error);
      if (error instanceof ContactUsStorageError) {
        throw error;
      }
      throw new ContactUsStorageError(`Unexpected error while deleting contact message with ID: ${id}`, error);
    }
  },
};
