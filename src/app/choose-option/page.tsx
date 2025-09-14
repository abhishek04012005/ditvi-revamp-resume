// src/app/choose-option/page.tsx
import ChooseOption from '../../structure/chooseoption/ChooseOption';
import { UserDetails, ModelDetails } from '../../structure/chooseoption/ChooseOption';

interface PageProps {
  searchParams: Promise<{
    requestNumber?: string;
    userDetails?: string;
    modelDetails?: string;
  }>;
}

export default async function ChooseOptionPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  let userDetails: UserDetails = { name: '' };
  let modelDetails: ModelDetails = { type: 'standard' };

  try {
    if (resolvedParams.userDetails) {
      userDetails = JSON.parse(resolvedParams.userDetails) as UserDetails;
    }
    if (resolvedParams.modelDetails) {
      modelDetails = JSON.parse(resolvedParams.modelDetails) as ModelDetails;
    }
  } catch (error) {
    console.error('Error parsing URL parameters:', error);
  }

  const requestNumber = resolvedParams.requestNumber || '';

  return (
    <ChooseOption
      requestNumber={requestNumber}
      userDetails={userDetails}
      modelDetails={modelDetails}
    />
  );
}
