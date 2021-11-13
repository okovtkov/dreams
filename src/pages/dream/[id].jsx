import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DreamReview from '../../components/dream-review/dream-review';
import LayoutDefault from '../../layouts/default';

export default function PageIndex() {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <LayoutDefault>
      <DreamReview onClose={() => navigate('/')} dreamId={params.id} />
    </LayoutDefault>
  );
}
