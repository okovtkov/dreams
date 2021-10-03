/* eslint-disable global-require */
import React from 'react';
import Image from 'next/image';
import css from './video-list.module.scss';
import DreamCategories, { categories } from '../dream-categories/dream-categories';

export default function VideoList() {
  const videos = [
    {
      src: require('./assets/Rectangle 1.png'),
      title: 'превью',
      categories: [8, 1],
      id: 1,
    },
    {
      src: require('./assets/Rectangle 2.png'),
      title: 'превью',
      categories: [6, 1, 3],
      id: 2,
    },
    {
      src: require('./assets/Rectangle 3.png'),
      title: 'превью',
      categories: [1, 2],
      id: 3,
    },
    {
      src: require('./assets/Rectangle 4.png'),
      title: 'превью',
      categories: [6, 13],
      id: 4,
    },
    {
      src: require('./assets/Rectangle 5.png'),
      title: 'превью',
      categories: [6, 1, 3],
      id: 5,
    },
    {
      src: require('./assets/Rectangle 6.png'),
      title: 'превью',
      categories: [6, 13],
      id: 6,
    },
    {
      src: require('./assets/Rectangle 7.png'),
      title: 'превью',
      categories: [6, 13],
      id: 7,
    },
    {
      src: require('./assets/Rectangle 8.png'),
      title: 'превью',
      categories: [6, 1, 3],
      id: 8,
    },
    {
      src: require('./assets/Rectangle 9.png'),
      title: 'превью',
      categories: [1, 2],
      id: 9,
    },
    {
      src: require('./assets/Rectangle 10.png'),
      title: 'превью',
      categories: [6, 1, 3],
      id: 10,
    },
    {
      src: require('./assets/Rectangle 11.png'),
      title: 'превью',
      categories: [8, 1],
      id: 11,
    },
    {
      src: require('./assets/Rectangle 12.png'),
      title: 'превью',
      categories: [6, 13],
      id: 12,
    },
    {
      src: require('./assets/Rectangle 13.png'),
      title: 'превью',
      categories: [6, 1, 3],
      id: 13,
    },
    {
      src: require('./assets/Rectangle 14.png'),
      title: 'превью',
      categories: [6, 13],
      id: 14,
    },
    {
      src: require('./assets/Rectangle 15.png'),
      title: 'превью',
      categories: [1, 2],
      id: 15,
    },
    {
      src: require('./assets/Rectangle 16.png'),
      title: 'превью',
      categories: [6, 13],
      id: 16,
    },
    {
      src: require('./assets/Rectangle 17.png'),
      title: 'превью',
      categories: [8, 1],
      id: 17,
    },
    {
      src: require('./assets/Rectangle 18.png'),
      title: 'превью',
      categories: [6, 1, 3],
      id: 18,
    },
  ];

  // eslint-disable-next-line arrow-body-style
  const getCategoriesByIds = (ids) => {
    return ids.map((id) => {
      const category = categories.find((one) => one.id === id);
      if (!category) throw new Error(`Нет категории с таким ID: ${id}`);
      return category;
    });
  };

  return (
    <>
      <h2 className={css.title}>Dream ambassadors</h2>
      <ul className={css.list}>
        {videos.map((video) => (
          <li key={video.id} className={css.item}>
            <a href="#s" className={css.link}>
              <Image src={video.src} alt={video.title} />
              <DreamCategories
                categories={getCategoriesByIds(video.categories)}
                mode="small"
              />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
