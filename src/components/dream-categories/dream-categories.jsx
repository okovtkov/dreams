import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';
import css from './dream-categories.module.scss';

const categories = [
  {
    image: require('./assets/sdg-1.png'),
    title: 'no poverty'
  },
  {
    image: require('./assets/sdg-2.png'),
    title: 'zero hunger'
  },
  {
    image: require('./assets/sdg-3.png'),
    title: 'good health and well-being'
  },
  {
    image: require('./assets/sdg-4.png'),
    title: 'quality education'
  },
  {
    image: require('./assets/sdg-5.png'),
    title: 'gender quality'
  },
  {
    image: require('./assets/sdg-6.png'),
    title: 'clean water and sanitation'
  },
  {
    image: require('./assets/sdg-7.png'),
    title: 'affordable and clean energy'
  },
  {
    image: require('./assets/sdg-8.png'),
    title: 'decent work and economic growth'
  },
  {
    image: require('./assets/sdg-9.png'),
    title: 'industry, innovation and infrastructure'
  },
  {
    image: require('./assets/sdg-10.png'),
    title: 'reduced inequalities'
  },
  {
    image: require('./assets/sdg-11.png'),
    title: 'sustainable cities and communities'
  },
  {
    image: require('./assets/sdg-12.png'),
    title: 'responsible consumption and production'
  },
  {
    image: require('./assets/sdg-13.png'),
    title: 'climate action'
  },
  {
    image: require('./assets/sdg-14.png'),
    title: 'life below water'
  },
  {
    image: require('./assets/sdg-15.png'),
    title: 'life on land'
  },
  {
    image: require('./assets/sdg-16.png'),
    title: 'peace, justice and strong institution'
  },
  {
    image: require('./assets/sdg-17.png'),
    title: 'partnership for the goals'
  }
]

export default function DreamCategories(props) {
  return (
    <ul className={css.list}>
      {categories.map(category => (
        <li
          key={category.title}
          className={classNames(css.item, {
            [css.item_checked]: props.selectedCategories.includes(category)
          })}
        >
          <label>
            <Image src={category.image} alt={category.title} className={css.image} />
            <input
              type="checkbox"
              checked={props.selectedCategories.includes(category)}
              onChange={() => props.onToggleCategory(category)}
              className={css.checkbox}
            />
          </label>
        </li>
      ))}
    </ul>
  );
}