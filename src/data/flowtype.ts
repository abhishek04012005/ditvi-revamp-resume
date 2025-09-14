// FlowType.ts

// Enum for flow types
export enum FlowType {
  FLOW_WHATSAPP = 1,
  FLOW_UPLOAD_BIODATA = 2,
  FLOW_CREATE_BIODATA = 3,
}

// Interface for style object
interface FlowTypeStyle {
  color: string;
  backgroundColor: string;
  padding: string;
  borderRadius: string;
  fontSize: string;
  fontWeight: string;
}

// Interface for flow type details
interface FlowTypeDetails {
  label: string;
  style: FlowTypeStyle;
}

// Type for the lookup object
type FlowTypeLookup = {
  [key in FlowType]: FlowTypeDetails;
};

const FLOW_TYPE_BY_ID: FlowTypeLookup = {
  [FlowType.FLOW_WHATSAPP]: {
    label: 'WhatsApp',
    style: {
      color: '#25D366',
      backgroundColor: '#dcf8c6',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: '500'
    }
  },
  [FlowType.FLOW_UPLOAD_BIODATA]: {
    label: 'Upload Biodata',
    style: {
      color: '#ff6b00',
      backgroundColor: '#fff3e6',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: '500'
    }
  },
  [FlowType.FLOW_CREATE_BIODATA]: {
    label: 'Create Biodata',
    style: {
      color: '#8b5cf6',
      backgroundColor: '#f3e8ff',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: '500'
    }
  }
};

export const getFlowTypeById = (id: FlowType): string => {
  return FLOW_TYPE_BY_ID[id]?.label || 'Unknown Flow Type';
};

export const getFlowTypeStyle = (id: FlowType): FlowTypeStyle => {
  return FLOW_TYPE_BY_ID[id]?.style || {};
};

export type { FlowTypeStyle, FlowTypeDetails };