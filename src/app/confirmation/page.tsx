import { Suspense } from 'react';
import ConfirmationPage from '../../component/requestconfirmation/RequestConfirmation';

export default function RequestConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationPage />
    </Suspense>
  );
}
