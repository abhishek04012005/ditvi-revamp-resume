
import STATUS_STEPS, { StatusStep } from '../constants/StatusSteps';

interface Status {
  id: number;
  created: string;
}

const DefaultStatusText: string = STATUS_STEPS[0].label;
const DefaultStatusId: number = STATUS_STEPS[0].id;

export const getLatestStatusText = (statusArray: Status[] | undefined): string => {
  if (!Array.isArray(statusArray) || statusArray.length === 0) {
    return DefaultStatusText;
  }

  const latestStatus = statusArray.reduce((latest, current) => {
    return current.id > latest.id ? current : latest;
  });

  return STATUS_STEPS[latestStatus.id]?.label || DefaultStatusText;
};

export const getLatestStatusId = (statusArray: Status[] | undefined): number => {
  if (!Array.isArray(statusArray) || statusArray.length === 0) {
    return DefaultStatusId;
  }

  const latestStatus = statusArray.reduce((latest, current) => {
    return current.id > latest.id ? current : latest;
  });

  return STATUS_STEPS[latestStatus.id]?.id || DefaultStatusId;
};

export const getStatusLabel = (statusId: number): string => {
  const status = STATUS_STEPS.find((step) => step.id === statusId);
  return status ? status.label : 'Unknown Status';
};

export const getStatusIcon = (statusId: number): string => {
  const status = STATUS_STEPS.find((step) => step.id === statusId);
  return status ? status.icon : '❓';
};

export const getStatusColor = (statusId: number): string => {
  const status = STATUS_STEPS.find((step) => step.id === statusId);
  return status ? status.color : '#000000';
};

interface StatusStyle {
  backgroundColor: string;
  color: string;
  padding: string;
  borderRadius: string;
  fontWeight: string;
  fontSize: string;
  display: string;
}

export const getStatusStyle = (statusId: number): StatusStyle => {
  const status = STATUS_STEPS.find((step) => step.id === statusId);
  return {
    backgroundColor: `${status?.color || '#000000'}20`,
    color: status?.color || '#000000',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontWeight: '500',
    fontSize: '0.9rem',
    display: 'inline-block'
  };
};

// Add type definition for the STATUS_STEPS constant
export type { Status, StatusStyle, StatusStep };