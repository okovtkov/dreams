/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DreamReview from '../dream-review/dream-review';
import dreams from '../../api/dreams';
import css from './dreams-list.module.scss';
import Positioner from '../positioner/positioner';
import DreamPreview from '../dream-preview/dream-preview';

export default function DreamsList() {
  const params = useParams();
  const [dreamsList, setDreamsList] = useState([]);
  const [activeDreamId, setActiveDreamId] = useState(params.id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeDreamId) {
      history.pushState(null, document.title, `/${activeDreamId}`);
    } else if (document.location.pathname !== '/dreams') {
      history.pushState(null, document.title, '/dreams');
    }
  }, [activeDreamId]);

  useEffect(() => {
    dreams.get()
      .then((result) => setDreamsList(result))
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      {activeDreamId && (
        <DreamReview onClose={() => setActiveDreamId(null)} dreamId={activeDreamId} />
      )}
      <Positioner>
        <h2 className={css.title}>Dream ambassadors</h2>
        <ul className={css.list}>
          {dreamsList.map((dream) => (
            <DreamPreview
              key={dream.id}
              dream={dream}
              onSelectDream={(selectedDream) => setActiveDreamId(selectedDream.id)}
            />
          ))}
        </ul>
      </Positioner>
    </>
  ) : <span>ЗАГРУЗОЧКА</span>;
}
