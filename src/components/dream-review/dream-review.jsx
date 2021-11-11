/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-danger */
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import dreams from '../../api/dreams';
import { categories } from '../dream-categories/dream-categories';
import css from './dream-review.module.scss';
import IconShareLink from '../svg-icon/icons/icon-share-link';
import IconLike from '../svg-icon/icons/icon-like';

export default function DreamReview(props) {
  const [likeState, setLikeState] = useState(false);
  const [dream, setDream] = useState({
    html: '',
    name: '',
    country: '',
    categories: [],
    id: '',
  });
  const link = useRef();

  const copyText = () => {
    navigator.clipboard.writeText(link.current.value);
  };

  useEffect(() => {
    dreams.get().then((dreamsList) => {
      const result = dreamsList.find((item) => item.id === props.dreamId);
      setDream(result);
    });
  }, []);

  return (
    <section className={css.dreamReview}>
      <div className={css.wrapper}>
        {dream.html ? (
          <div className={css.video} dangerouslySetInnerHTML={{ __html: dream.html }} />
        ) : (
          <div className={css.text}>{dream.text}</div>
        )}
        <div className={css.infoWrapper}>
          <div className={css.information}>
            <header className={css.header}>
              <h2>Dream</h2>
              <Link href="/" scroll={false}>
                <a className={css.close}>закрыть</a>
              </Link>
            </header>
            <h3 className={css.heading_3}>Sent by</h3>
            <p className={css.prop}>{dream.name}</p>
            <h3 className={css.heading_3}>Location</h3>
            <p className={css.prop}>{dream.country}</p>
            <h3 className={css.heading_3}>Categories</h3>
            <div className={css.categories}>
              {categories.map((category) => {
                if (dream.categories.find((item) => item === category.id)) {
                  return (
                    <div className={css.imageWrapper} key={category.id}>
                      <img
                        src={category.image}
                        alt={category.title}
                        className={css.category}
                      />
                      <div className={css.hint}>{category.title}</div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className={css.likes}>
              <button
                type="button"
                className={classNames(css.like, {
                  [css.like_active]: likeState,
                })}
                onClick={() => setLikeState(!likeState)}
              >
                <IconLike />
              </button>
              <p>24 hearts for this dream</p>
            </div>
            <h3 className={css.heading_3}>Share this dream</h3>
            <div className={css.share}>
              <input
                ref={link}
                className={css.input}
                type="text"
                value={`localhost:3000/dream/${dream.id}`}
                disabled
              />
              <button className={css.shareButton} type="button" onClick={() => copyText()}>
                <IconShareLink />
              </button>
            </div>
          </div>
          <div className={css.controls} />
        </div>
      </div>
    </section>
  );
}
