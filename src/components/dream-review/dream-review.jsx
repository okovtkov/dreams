/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import classNames from 'classnames';
import { categories } from '../dream-categories/dream-categories';
import css from './dream-review.module.scss';
import IconShareLink from '../svg-icon/icons/icon-share-link';
import IconLike from '../svg-icon/icons/icon-like';

export default function DreamReview(props) {
  const [likeState, setLikeState] = useState(false);

  return props.open && (
    <section className={css.dreamReview}>
      <div className={css.video} dangerouslySetInnerHTML={{ __html: props.dreamProps.html }} />
      <div className={css.infoWrapper}>
        <div className={css.information}>
          <header className={css.header}>
            <h2>Dream</h2>
            <button type="button" className={css.close} onClick={props.onClose} />
          </header>
          <h3 className={css.heading_3}>Sent by</h3>
          <p className={css.prop}>{props.dreamProps.name}</p>
          <h3 className={css.heading_3}>Location</h3>
          <p className={css.prop}>{props.dreamProps.country}</p>
          <h3 className={css.heading_3}>Categories</h3>
          <div className={css.categories}>
            {categories.map((category) => {
              if (props.dreamProps.categories.find((item) => item === category.id)) {
                return (
                  <div className={css.imageWrapper}>
                    <img
                      key={category.id}
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
            <input className={css.input} type="text" value="kek" disabled />
            <div className={css.shareButton}>
              <IconShareLink />
            </div>
          </div>
        </div>
        <div className={css.controls} />
      </div>
    </section>
  );
}
