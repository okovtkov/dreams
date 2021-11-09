/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import dreams from '../../api/dreams';
import css from './dreams-list.module.scss';
import DreamCategories, { categories } from '../dream-categories/dream-categories';
import Positioner from '../positioner/positioner';
import DreamReview from '../dream-review/dream-review';

export default function DreamsList() {
  const [dreamsList, setDreamsList] = useState([]);
  const [openState, setOpenState] = useState(false);
  const [dreamProps, setDreamProps] = useState({
    selectedCategories: [],
    name: '',
    country: '',
    html: '',
  });

  const getCategoriesByIds = (ids) => ids.map((id) => {
    const category = categories.find((one) => one.id === id);
    if (!category) throw new Error(`Нет категории с таким ID: ${id}`);
    return category;
  });

  useEffect(() => {
    dreams.get().then((result) => setDreamsList(result));
  }, []);

  const onClick = (dream) => {
    setOpenState(true);
    setDreamProps(dream);
  };

  return dreamsList.length > 0 ? (
    <>
      <DreamReview
        open={openState}
        onClose={() => setOpenState(false)}
        dreamProps={dreamProps}
      />
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
              <a href="#s" className={css.link} onClick={() => onClick(dream)}>
                {dream.type === 'video' && (
                  // eslint-disable-next-line react/no-danger
                  <div className={css.image} dangerouslySetInnerHTML={{ __html: dream.preview }} />
                )}
                {dream.type === 'text' && (
                  <p className={css.text}>{dream.text}</p>
                )}
                <DreamCategories
                  categories={getCategoriesByIds(dream.categories)}
                  mode="small"
                />
              </a>
            </li>
          ))}
        </ul>
      </Positioner>
    </>
  ) : <span>ЗАГРУЗОЧКА</span>;
}
