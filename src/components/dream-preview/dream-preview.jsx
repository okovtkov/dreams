import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import css from './dream-preview.module.scss';
import DreamCategories, { categories } from '../dream-categories/dream-categories';

export default function DreamPreview(props) {
  const clickAtDreamHandler = (event, dream) => {
    event.preventDefault();
    props.onSelectDream(dream);
  };

  const getCategoriesByIds = (ids) => ids.map((id) => {
    const category = categories.find((one) => one.id === id);
    if (!category) throw new Error(`Нет категории с таким ID: ${id}`);
    return category;
  });

  const id = useMemo(() => (props.dream.type === 'video'
    ? new URL(props.dream.text).pathname.slice(1) : ''),
  [props.dream]);

  return (
    <li
      className={classNames(css.item, {
        [css.item_text]: props.dream.type === 'text',
      })}
    >
      <Link
        className={css.link}
        to={`/${props.dream.id}`}
        onClick={(e) => clickAtDreamHandler(e, props.dream)}
        onKeyDown={(e) => clickAtDreamHandler(e, props.dream)}
        tabIndex={0}
        role="button"
      >
        {props.dream.type === 'video' && (
          <img
            srcSet={`
              https://vumbnail.com/${id}_large.jpg 640w,
              https://vumbnail.com/${id}_medium.jpg 200w,
              https://vumbnail.com/${id}_small.jpg 100w
            `}
            sizes="(max-width: 640px) 100vw, 640px"
            src={`https://vumbnail.com/${id}.jpg`}
            alt="превью"
          />
        )}
        {props.dream.type === 'text' && (
          <p className={css.text}>{props.dream.text}</p>
        )}
        <DreamCategories
          categories={getCategoriesByIds(props.dream.categories)}
          mode="small"
        />
      </Link>
    </li>
  );
}
