// BiodataRequest.ts
import { supabase } from "./Supabase";
import { FlowType } from "../data/flowtype";

interface Status {
  id: number;
  created: string;
}

interface BiodataRequest {
  id?: number;
  created_at?: string;
  request_number: string;
  flow_type: FlowType;
  status: Status[];
  user_details: Record<string, unknown>;
  model_details: Record<string, unknown>;
  profile_url?: string;
  biodata_url?: string;
  personal_details?: Record<string, unknown>;
  professional_details?: Record<string, unknown>;
  examination_details?: Record<string, unknown>;
  education_details?: Record<string, unknown>;
  family_details?: Record<string, unknown>;
  contact_details?: Record<string, unknown>;
  completed?: boolean;
  deleted?: boolean;
}

interface WhatsappBiodataRequest {
  requestNumber: string;
  userDetails: Record<string, unknown>;
  modelDetails: Record<string, unknown>;
}

interface UploadBiodataRequest extends WhatsappBiodataRequest {
  profileUrl: string;
  biodataUrl: string;
}

interface CreateBiodataRequest extends UploadBiodataRequest {
  personalDetails: Record<string, unknown>;
  professionalDetails: Record<string, unknown>;
  examinationDetails: Record<string, unknown>;
  educationDetails: Record<string, unknown>;
  familyDetails: Record<string, unknown>;
  contactDetails: Record<string, unknown>;
}

const biodataRequestTableName = "biodata_request";

export const BiodataRequestStorage = {
  async getAllBiodataRequest(): Promise<BiodataRequest[]> {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .select(`
          id,
          created_at,
          request_number,
          flow_type,
          status,
          user_details,
          model_details,
          profile_url,
          biodata_url,
          personal_details,
          professional_details,
          examination_details,
          education_details,
          family_details,
          contact_details,
          completed
        `)
        .eq("deleted", false)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as BiodataRequest[];
    } catch (error) {
      console.error("Error getAllBiodataRequest:", error);
      throw error;
    }
  },

  async getAllBiodataRequestWithoutAnyFilters(): Promise<BiodataRequest[]> {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .select(`
          id,
          created_at,
          request_number,
          flow_type,
          status,
          user_details,
          model_details,
          profile_url,
          biodata_url,
          personal_details,
          professional_details,
          examination_details,
          education_details,
          family_details,
          contact_details,
          completed
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as BiodataRequest[];
    } catch (error) {
      console.error("Error getAllBiodataRequestWithoutAnyFilters:", error);
      throw error;
    }
  },

  async saveBiodataRequestFromWhatsapp(
    biodataRequest: WhatsappBiodataRequest
  ): Promise<BiodataRequest> {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .insert({
          request_number: biodataRequest.requestNumber,
          flow_type: FlowType.FLOW_WHATSAPP,
          status: [
            {
              id: 0,
              created: new Date().toISOString(),
            },
          ],
          user_details: biodataRequest.userDetails,
          model_details: biodataRequest.modelDetails,
        })
        .select("*")
        .single();

      if (error) throw error;
      return data as BiodataRequest;
    } catch (error) {
      console.error("Error saveBiodataRequestFromWhatsapp:", error);
      throw error;
    }
  },

  async saveBiodataRequestFromUploadBiodata(
    biodataRequest: UploadBiodataRequest
  ): Promise<BiodataRequest> {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .insert({
          request_number: biodataRequest.requestNumber,
          status: [
            {
              id: 0,
              created: new Date().toISOString(),
            },
          ],
          flow_type: FlowType.FLOW_UPLOAD_BIODATA,
          user_details: biodataRequest.userDetails,
          model_details: biodataRequest.modelDetails,
          profile_url: biodataRequest.profileUrl,
          biodata_url: biodataRequest.biodataUrl,
        })
        .select("*")
        .single();

      if (error) throw error;
      return data as BiodataRequest;
    } catch (error) {
      console.error("Error saveBiodataRequestFromUploadBiodata:", error);
      throw error;
    }
  },

  async saveBiodataRequestFromCreateBiodata(
    biodataRequest: CreateBiodataRequest
  ): Promise<BiodataRequest> {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .insert({
          request_number: biodataRequest.requestNumber,
          status: [
            {
              id: 0,
              created: new Date().toISOString(),
            },
          ],
          flow_type: FlowType.FLOW_CREATE_BIODATA,
          user_details: biodataRequest.userDetails,
          model_details: biodataRequest.modelDetails,
          profile_url: biodataRequest.profileUrl,
          personal_details: biodataRequest.personalDetails,
          professional_details: biodataRequest.professionalDetails,
          examination_details: biodataRequest.examinationDetails,
          education_details: biodataRequest.educationDetails,
          family_details: biodataRequest.familyDetails,
          contact_details: biodataRequest.contactDetails,
        })
        .select("*")
        .single();

      if (error) throw error;
      return data as BiodataRequest;
    } catch (error) {
      console.error("Error saveBiodataRequestFromCreateBiodata:", error);
      throw error;
    }
  },

  async updateStatusBiodataRequestById(
    requestId: number,
    status: Status[]
  ): Promise<BiodataRequest> {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .update({ status })
        .eq("id", requestId)
        .select("*")
        .single();

      if (error) throw error;
      return data as BiodataRequest;
    } catch (error) {
      console.error("Error updateStatusBiodataRequestById:", error);
      throw error;
    }
  },

  async updateStatusBiodataRequestByRequestNumber(
    requestNumber: string,
    status: Status[],
    completed = false
  ): Promise<BiodataRequest> {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .update({
          status,
          completed,
        })
        .eq("request_number", requestNumber)
        .select("*")
        .single();

      if (error) throw error;
      return data as BiodataRequest;
    } catch (error) {
      console.error("Error updateStatusBiodataRequestByRequestNumber:", error);
      throw error;
    }
  },

  async deleteBiodataRequestById(requestId: number): Promise<BiodataRequest> {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .update({
          deleted: true,
        })
        .eq("id", requestId)
        .select("*")
        .single();

      if (error) throw error;
      return data as BiodataRequest;
    } catch (error) {
      console.error("Error deleteBiodataRequestById:", error);
      throw error;
    }
  },

  async getBiodataRequestByRequestNumber(
    requestNumber: string
  ): Promise<BiodataRequest> {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .select("*")
        .eq("request_number", requestNumber)
        .single();

      if (error) throw error;
      return data as BiodataRequest;
    } catch (error) {
      console.error("Error getBiodataRequestByRequestNumber:", error);
      throw error;
    }
  },

  async checkBiodataRequestByRequestNumber(
    requestNumber: string
  ): Promise<BiodataRequest | null> {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .select("*")
        .eq("request_number", requestNumber)
        .eq("deleted", false)
        .maybeSingle();

      if (error) {
        if (error.code === "PGRST116") {
          return null;
        }
        throw error;
      }

      return data as BiodataRequest | null;
    } catch (error) {
      console.error("Error checkBiodataRequestByRequestNumber:", error);
      throw error;
    }
  },

  async getBiodataRequestByRequestId(requestId: number): Promise<BiodataRequest> {
    try {
      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .select("*")
        .eq("id", requestId)
        .single();

      if (error) throw error;
      return data as BiodataRequest;
    } catch (error) {
      console.error("Error getBiodataRequestByRequestId:", error);
      throw error;
    }
  },

  async searchBiodataRequests(searchTerm: string): Promise<BiodataRequest[]> {
    try {
      const numericSearchTerm = parseInt(searchTerm);

      if (isNaN(numericSearchTerm)) {
        return [];
      }

      const searchNumbers = [
        ...Array.from({ length: 10 }, (_, i) => parseInt(`${searchTerm}${i}`)),
        ...Array.from({ length: 10 }, (_, i) => parseInt(`${i}${searchTerm}`)),
        numericSearchTerm,
      ];

      const { data, error } = await supabase
        .from(biodataRequestTableName)
        .select("*")
        .eq("deleted", false)
        .in("request_number", searchNumbers)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as BiodataRequest[];
    } catch (error) {
      console.error("Error searching biodata requests:", error);
      throw error;
    }
  },
};

export type {
  BiodataRequest,
  WhatsappBiodataRequest,
  UploadBiodataRequest,
  CreateBiodataRequest,
  Status,
};