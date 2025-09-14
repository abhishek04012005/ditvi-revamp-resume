// types/production.ts
import { FlowType } from "../data/flowtype";

export interface StyleSettings {
  [key: string]: unknown;
}

export interface ProductionRequest {
  id?: number;
  biodata_request_id: number;
  request_number: string;
  flow_type: FlowType;
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
  style_settings?: StyleSettings;
  completed?: boolean;
  deleted?: boolean;
  created_at?: string;
}

export interface SaveProductionRequestParams {
  biodataRequestId: number;
  requestNumber: string;
  flowType: FlowType;
  userDetails: Record<string, unknown>;
  modelDetails: Record<string, unknown>;
  profileUrl?: string;
  biodataUrl?: string;
  personalDetails?: Record<string, unknown>;
  professionalDetails?: Record<string, unknown>;
  examinationDetails?: Record<string, unknown>;
  educationDetails?: Record<string, unknown>;
  familyDetails?: Record<string, unknown>;
  contactDetails?: Record<string, unknown>;
}

export interface UpdateProductionRequestParams {
  profileUrl?: string;
  personalDetails?: Record<string, unknown>;
  professionalDetails?: Record<string, unknown>;
  examinationDetails?: Record<string, unknown>;
  educationDetails?: Record<string, unknown>;
  familyDetails?: Record<string, unknown>;
  contactDetails?: Record<string, unknown>;
  styleSettings?: StyleSettings;
  completed?: boolean;
}

// ProductionRequest.ts
import { supabase } from "./Supabase";
// Removed import of types from "../types/production" as they are defined above

const productionRequestTableName = "production_request";

export const ProductionRequestStorage = {
  async getAllProductionRequest(): Promise<ProductionRequest[]> {
    try {
      const { data, error } = await supabase
        .from(productionRequestTableName)
        .select(`
          id,
          biodata_request_id,
          request_number,
          flow_type,
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
          completed,
          created_at
        `)
        .eq("deleted", false)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ProductionRequest[];
    } catch (error) {
      console.error("Error getAllProductionRequest:", error);
      throw error;
    }
  },

  async saveProductionRequest(
    productionRequest: SaveProductionRequestParams
  ): Promise<ProductionRequest> {
    try {
      const { data, error } = await supabase
        .from(productionRequestTableName)
        .insert({
          biodata_request_id: productionRequest.biodataRequestId,
          request_number: productionRequest.requestNumber,
          flow_type: productionRequest.flowType,
          profile_url: productionRequest.profileUrl,
          biodata_url: productionRequest.biodataUrl,
          user_details: productionRequest.userDetails,
          model_details: productionRequest.modelDetails,
          personal_details: productionRequest.personalDetails,
          professional_details: productionRequest.professionalDetails,
          examination_details: productionRequest.examinationDetails,
          education_details: productionRequest.educationDetails,
          family_details: productionRequest.familyDetails,
          contact_details: productionRequest.contactDetails,
        })
        .select("*")
        .single();

      if (error) throw error;
      return data as ProductionRequest;
    } catch (error) {
      console.error("Error saveProductionRequest:", error);
      throw error;
    }
  },

  async getProductionRequestById(id: number): Promise<ProductionRequest> {
    try {
      const { data, error } = await supabase
        .from(productionRequestTableName)
        .select(`
          id,
          biodata_request_id,
          request_number,
          flow_type,
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
          style_settings,
          created_at
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as ProductionRequest;
    } catch (error) {
      console.error("Error getProductionRequestById:", error);
      throw error;
    }
  },

  async updateProductionRequestById(
    id: number,
    productionRequest: UpdateProductionRequestParams
  ): Promise<ProductionRequest> {
    try {
      const { data, error } = await supabase
        .from(productionRequestTableName)
        .update({
          profile_url: productionRequest.profileUrl,
          personal_details: productionRequest.personalDetails,
          professional_details: productionRequest.professionalDetails,
          examination_details: productionRequest.examinationDetails,
          education_details: productionRequest.educationDetails,
          family_details: productionRequest.familyDetails,
          contact_details: productionRequest.contactDetails,
          style_settings: productionRequest.styleSettings,
          completed: productionRequest.completed,
        })
        .eq("id", id)
        .select("*")
        .single();

      if (error) throw error;
      return data as ProductionRequest;
    } catch (error) {
      console.error("Error updateProductionRequestById:", error);
      throw error;
    }
  },

  async updateProductionRequestByRequestNumber(
    requestNumber: string,
    productionRequest: UpdateProductionRequestParams
  ): Promise<ProductionRequest> {
    try {
      const { data, error } = await supabase
        .from(productionRequestTableName)
        .update({
          profile_url: productionRequest.profileUrl,
          personal_details: productionRequest.personalDetails,
          professional_details: productionRequest.professionalDetails,
          examination_details: productionRequest.examinationDetails,
          education_details: productionRequest.educationDetails,
          family_details: productionRequest.familyDetails,
          contact_details: productionRequest.contactDetails,
          style_settings: productionRequest.styleSettings,
          completed: productionRequest.completed,
        })
        .eq("request_number", requestNumber)
        .select("*")
        .single();

      if (error) throw error;
      return data as ProductionRequest;
    } catch (error) {
      console.error("Error updateProductionRequestByRequestNumber:", error);
      throw error;
    }
  },

  async deleteProductionRequestByRequestNumber(
    requestNumber: string
  ): Promise<ProductionRequest[]> {
    try {
      const { data, error } = await supabase
        .from(productionRequestTableName)
        .update({
          deleted: true,
        })
        .eq("request_number", requestNumber);

      if (error) throw error;
      return data as unknown as ProductionRequest[];
    } catch (error) {
      console.error("Error deleteProductionRequestByRequestNumber:", error);
      throw error;
    }
  },
};

