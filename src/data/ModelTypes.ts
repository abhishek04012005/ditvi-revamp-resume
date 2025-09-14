// src/types/ModelTypes.tsx

interface ModelType {
  Name: string;
  Code: string;
}

interface ModelTypes {
  Professional: ModelType;
}

export const ModelTypes: ModelTypes = {
  Professional: {
    Name: "Experience",
    Code: "experience",
  }
} as const;

// Type-safe enum for model codes
export enum ModelTypeCode {
  Experience = "experience",
  Student = "student",
}

// Helper type for getting model names
export type ModelTypeName = typeof ModelTypes[keyof typeof ModelTypes]["Name"];

export default ModelTypes;