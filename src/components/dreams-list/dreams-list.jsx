/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import DreamReview from '../dream-review/dream-review';
import dreams from '../../api/dreams';
import css from './dreams-list.module.scss';
import DreamCategories, { categories } from '../dream-categories/dream-categories';
import Positioner from '../positioner/positioner';

export default function DreamsList() {
  const params = useParams();
  const [dreamsList, setDreamsList] = useState([]);
  const [activeDreamId, setActiveDreamId] = useState(params.id);

  const getCategoriesByIds = (ids) => ids.map((id) => {
    const category = categories.find((one) => one.id === id);
    if (!category) throw new Error(`Нет категории с таким ID: ${id}`);
    return category;
  });

  useEffect(() => {
    if (activeDreamId) {
      history.pushState(null, document.title, `/dreams/${activeDreamId}`);
    } else if (document.location.pathname !== '/dreams') {
      history.pushState(null, document.title, '/dreams');
    }
  }, [activeDreamId]);

  const clickAtDreamHandler = (event, dream) => {
    event.preventDefault();
    setActiveDreamId(dream.id);
  };

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
            <li
              key={dream.id}
              className={classNames(css.item, {
                [css.item_text]: !dream.preview,
              })}
            >
              <Link
                className={css.link}
                to={`/${dream.id}`}
                onClick={(e) => clickAtDreamHandler(e, dream)}
                onKeyDown={(e) => clickAtDreamHandler(e, dream)}
                tabIndex={0}
                role="button"
              >
                {dream.type === 'video' && (
                  <div
                    className={css.image}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: dream.preview }}
                  />
                )}
                {dream.type === 'text' && (
                  <p className={css.text}>{dream.text}</p>
                )}
                <DreamCategories
                  categories={getCategoriesByIds(dream.categories)}
                  mode="small"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Positioner>
    </>
  ) : <span>ЗАГРУЗОЧКА</span>;
}
