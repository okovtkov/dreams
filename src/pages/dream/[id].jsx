import React from 'react';
import { useRouter } from 'next/router';
import DreamReview from '../../components/dream-review/dream-review';
import LayoutDefault from '../../layouts/default';

export default function PageIndex() {
  const router = useRouter();
  return (
    <LayoutDefault>
      <DreamReview onClose={() => router.push('/')} dreamId={router.query.id} />
    </LayoutDefault>
  );
}
