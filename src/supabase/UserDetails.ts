import { supabase } from './Supabase';

interface UserDetails {
  name: string;
  mobileNumber: string;
}

interface ModelDetails {
  modelNumber: string;
  language: string;
  type: string;
  amount: number;
}

interface SaveUserDetailsParams {
  userDetails: UserDetails;
  modelDetails: ModelDetails;
}

interface UserDetailResponse {
  id: number;
  request_number: string;
  user_details: UserDetails;
  model_details: ModelDetails;
  created_at?: string;
}

export const UserDetailsStorage = {
  async saveUserDetails({
    userDetails,
    modelDetails,
  }: SaveUserDetailsParams): Promise<UserDetailResponse> {
    try {
      const { data, error } = await supabase
        .from('user_details')
        .insert({
          user_details: userDetails,
          model_details: modelDetails,
        })
        .select('id, request_number')
        .single();

      if (error) throw error;
      if (!data) throw new Error('No data returned from insertion');

      return data as UserDetailResponse;
    } catch (error) {
      console.error('Error saving User details:', error);
      throw error;
    }
  },

  async getAllUsers(): Promise<UserDetailResponse[]> {
    try {
      const { data, error } = await supabase
        .from('user_details')
        .select('*');

      if (error) throw error;
      if (!data) return [];

      return data as UserDetailResponse[];
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  },
};