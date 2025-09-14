// types/status.ts
export interface StatusStep {
  id: number;
  label: string;
  icon: string;
  color: string;
}

export type Direction = typeof MOVE_FORWARD | typeof MOVE_BACKWARD;

// constants/StatusSteps.ts


export const STATUS_STEPS: readonly StatusStep[] = [
  {
    id: 0,
    label: "Request Received",
    icon: "📝",
    color: "#FF870F"
  },
  {
    id: 1,
    label: "Work in progress",
    icon: "⚡",
    color: "#FFC107"
  },
  {
    id: 2,
    label: "Sample Shared & In Review",
    icon: "👀",
    color: "#2196F3"
  },
  {
    id: 3,
    label: "Approved by User",
    icon: "✅",
    color: "#9C27B0"
  },
  {
    id: 4,
    label: "Payment Confirmed",
    icon: "💳",
    color: "#795548"
  },
  {
    id: 5,
    label: "Request Fulfilled",
    icon: "🎉",
    color: "#4CAF50"
  },
  {
    id: 6,
    label: "Feedback Received",
    icon: "⭐",
    color: "#8BC34A"
  }
] as const;

export const MOVE_FORWARD = 1;
export const MOVE_BACKWARD= -1;

export default STATUS_STEPS;