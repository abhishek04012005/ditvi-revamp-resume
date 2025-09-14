import ChooseOption from '../../structure/chooseoption/ChooseOption';
import { UserDetails, ModelDetails } from '../../structure/chooseoption/ChooseOption';

interface PageProps {
  searchParams: {
    requestNumber?: string;
    userDetails?: string;
    modelDetails?: string;
  };
}

export default function ChooseOptionPage({ searchParams }: PageProps) {
  let userDetails: UserDetails = { name: '' };
  let modelDetails: ModelDetails = { type: 'standard' };

  try {
    if (searchParams.userDetails) {
      userDetails = JSON.parse(searchParams.userDetails) as UserDetails;
    }
    if (searchParams.modelDetails) {
      modelDetails = JSON.parse(searchParams.modelDetails) as ModelDetails;
    }
  } catch (error) {
    console.error('Error parsing URL parameters:', error);
  }

  const requestNumber = searchParams.requestNumber || '';

  return (
    <ChooseOption
      requestNumber={requestNumber}
      userDetails={userDetails}
      modelDetails={modelDetails}
    />
  );
}

// Add this to enable static generation
export const dynamic = 'force-static';