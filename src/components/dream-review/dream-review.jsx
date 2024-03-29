/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-danger */
import React, {
  useState, useRef, useEffect, useMemo,
} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import dreams from '../../api/dreams';
import { categories } from '../dream-categories/categories';
import css from './dream-review.module.scss';
import IconShareLink from '../svg-icon/icons/icon-share-link';
import IconLike from '../svg-icon/icons/icon-like';

export default function DreamReview(props) {
  const [likeState, setLikeState] = useState(false);
  const [dream, setDream] = useState(null);
  const [loading, setLoading] = useState(true);
  const link = useRef();

  const id = useMemo(() => (dream?.type === 'video' ? new URL(dream.text).pathname.slice(1) : ''), [dream]);

  const copyText = () => {
    navigator.clipboard.writeText(link.current.value);
  };

  useEffect(() => {
    dreams.getById(props.dreamId).then((result) => {
      setDream(result);
      setLoading(false);
    });
  }, [props.dreamId]);

  const closeHandler = (event) => {
    if (event.code === 'Space' || event.code === 'Enter' || event.type === 'click') {
      event.preventDefault();
      props.onClose();
    }
  };

  return !loading && (
    <section className={css.dreamReview}>
      <div className={css.wrapper}>
        {dream.type === 'video' ? (
          <div className={css.video}>
            <iframe
              src={`https://player.vimeo.com/video/${id}?h=4e00583ca7&title=0&byline=0&portrait=0&
                speed=0&badge=0&autopause=0&player_id=0&app_id=228308`}
              width="400"
              height="300"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Untitled"
            />
          </div>
        ) : (
          <div className={css.text}>{dream.text}</div>
        )}
        <div className={css.infoWrapper}>
          <div className={css.information}>
            <header className={css.header}>
              <h2>Dream</h2>
              <Link to="/">
                <a
                  className={css.close}
                  onClick={closeHandler}
                  onKeyDown={closeHandler}
                  tabIndex={0}
                  role="button"
                >
                  закрыть
                </a>
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
                value={`${document.location.href}`}
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
