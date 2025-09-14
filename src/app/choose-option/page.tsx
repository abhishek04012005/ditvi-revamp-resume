import ChooseOption from '../../structure/chooseoption/ChooseOption';
import { UserDetails, ModelDetails } from '../../structure/chooseoption/ChooseOption';

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ChooseOptionPage({ searchParams }: PageProps) {
  let userDetails: UserDetails = { name: '' };
  let modelDetails: ModelDetails = { type: 'standard' };
  let params: { userDetails?: string; modelDetails?: string; requestNumber?: string } = {};

  try {
    if (searchParams) {
      params = await searchParams;
      if (typeof params.userDetails === 'string') {
        userDetails = JSON.parse(params.userDetails) as UserDetails;
      }
      if (typeof params.modelDetails === 'string') {
        modelDetails = JSON.parse(params.modelDetails) as ModelDetails;
      }
    }
  } catch (error) {
    console.error('Error parsing URL parameters:', error);
  }

  const requestNumber = (params.requestNumber as string) || '';

  return (
    <ChooseOption
      requestNumber={requestNumber}
      userDetails={userDetails}
      modelDetails={modelDetails}
    />
  );
}

// Since we're using async/await, we need to make this page dynamic
export const dynamic = 'force-dynamic';