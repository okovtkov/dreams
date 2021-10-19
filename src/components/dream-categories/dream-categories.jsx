/* eslint-disable global-require */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import css from './dream-categories.module.scss';

export const categories = [
  {
    image: require('./assets/sdg-1.png'),
    title: 'no poverty',
    id: 1,
    color: '#ea1f2d',
  },
  {
    image: require('./assets/sdg-2.png'),
    title: 'zero hunger',
    id: 2,
    color: '#cf9f2e',
  },
  {
    image: require('./assets/sdg-3.png'),
    title: 'good health and well-being',
    id: 3,
    color: '#2a9b49',
  },
  {
    image: require('./assets/sdg-4.png'),
    title: 'quality education',
    id: 4,
    color: '#c52738',
  },
  {
    image: require('./assets/sdg-5.png'),
    title: 'gender quality',
    id: 5,
    color: '#ed412c',
  },
  {
    image: require('./assets/sdg-6.png'),
    title: 'clean water and sanitation',
    id: 6,
    color: '#00acd9',
  },
  {
    image: require('./assets/sdg-7.png'),
    title: 'affordable and clean energy',
    id: 7,
    color: '#fcb618',
  },
  {
    image: require('./assets/sdg-8.png'),
    title: 'decent work and economic growth',
    id: 8,
    color: '#972f46',
  },
  {
    image: require('./assets/sdg-9.png'),
    title: 'industry, innovation and infrastructure',
    id: 9,
    color: '#f16e24',
  },
  {
    image: require('./assets/sdg-10.png'),
    title: 'reduced inequalities',
    id: 10,
    color: '#de1c84',
  },
  {
    image: require('./assets/sdg-11.png'),
    title: 'sustainable cities and communities',
    id: 11,
    color: '#f79d25',
  },
  {
    image: require('./assets/sdg-12.png'),
    title: 'responsible consumption and production',
    id: 12,
    color: '#cd8d2e',
  },
  {
    image: require('./assets/sdg-13.png'),
    title: 'climate action',
    id: 13,
    color: '#4e7b47',
  },
  {
    image: require('./assets/sdg-14.png'),
    title: 'life below water',
    id: 14,
    color: '#007cbb',
  },
  {
    image: require('./assets/sdg-15.png'),
    title: 'life on land',
    id: 15,
    color: '#3eae4b',
  },
  {
    image: require('./assets/sdg-16.png'),
    title: 'peace, justice and strong institution',
    id: 16,
    color: '#01588c',
  },
  {
    image: require('./assets/sdg-17.png'),
    title: 'partnership for the goals',
    id: 17,
    color: '#27426d',
  },
];

function DreamCategories(props) {
  const CategoryContainer = props.canSelect ? 'label' : 'span';

  return (
    <ul className={css[`list_${props.mode}`]}>
      {props.categories.map((category) => (
        <li
          key={category.title}
          className={classNames(css[`item_${props.mode}`], {
            [css.item_checked]:
              (props.selectedCategories && props.selectedCategories.includes(category)),
          })}
          style={{ backgroundColor: category.color }}
        >
          {props.mode === 'large' && (
            <CategoryContainer>
              <img
                src={category.image}
                alt={category.title}
                className={css.image}
                data-id={category.id}
              />
              {props.canSelect && (
                <input
                  type="checkbox"
                  checked={props.selectedCategories.includes(category)}
                  onChange={() => props.onToggleCategory(category)}
                  className={css.checkbox}
                />
              )}
            </CategoryContainer>
          )}
          {props.mode === 'small' && category.id}
        </li>
      ))}
    </ul>
  );
}

const categoryType = PropTypes.shape({
  // eslint-disable-next-line react/forbid-prop-types
  image: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number,
  color: PropTypes.string,
});

DreamCategories.propTypes = {
  canSelect: PropTypes.bool,
  mode: PropTypes.oneOf(['large', 'small']).isRequired,
  categories: PropTypes.arrayOf(categoryType).isRequired,
  selectedCategories: PropTypes.arrayOf(categoryType),
  onToggleCategory: PropTypes.func,
};

export default DreamCategories;
