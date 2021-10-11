/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import dreams from '../../api/dreams';
import css from './dreams-list.module.scss';
import DreamCategories, { categories } from '../dream-categories/dream-categories';

export default function DreamsList() {
  const [dreamsList, setDreamsList] = useState(null);
  const getCategoriesByIds = (ids) => ids.map((id) => {
    const category = categories.find((one) => one.id === id);
    if (!category) throw new Error(`Нет категории с таким ID: ${id}`);
    return category;
  });

  useEffect(() => {
    dreams.get().then((result) => setDreamsList(result));
  }, []);

  return dreamsList ? (
    <>
      <h2 className={css.title}>Dream ambassadors</h2>
      <ul className={css.list}>
        {dreamsList.map((dream) => (
          <li
            key={dream.id}
            className={classNames(css.item, {
              [css.item_text]: !dream.preview,
            })}
          >
            <a href="#s" className={css.link}>
              {dream.preview && (
                <Image src={dream.preview} alt={dream.title} />
              )}
              {!dream.preview && (
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
    </>
  ) : <span>ЗАГРУЗОЧКА</span>;
}
