/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import DreamReview from '../dream-review/dream-review';
import dreams from '../../api/dreams';
import css from './dreams-list.module.scss';
import Positioner from '../positioner/positioner';
import DreamPreview from '../dream-preview/dream-preview';

export default function DreamsList() {
  const [dreamsList, setDreamsList] = useState([]);
  const [activeDreamId, setActiveDreamId] = useState(null);

  useEffect(() => {
    if (activeDreamId) {
      history.pushState(null, document.title, `/dream/${activeDreamId}`);
    } else if (document.location.pathname !== '/dreams') {
      history.pushState(null, document.title, '/dreams');
    }
  }, [activeDreamId]);

  useEffect(() => {
    dreams.get().then((result) => setDreamsList(result));
  }, []);

  return dreamsList.length > 0 ? (
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
              activeDreamId={activeDreamId}
              setActiveDreamId={setActiveDreamId}
            />
          ))}
        </ul>
      </Positioner>
    </>
  ) : <span>ЗАГРУЗОЧКА</span>;
}
