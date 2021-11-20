import classNames from 'classnames';
import PropTypes from 'prop-types';
import Image from 'next/image';
import React from 'react';
import css from './dream-categories.module.scss';

function DreamCategories(props) {
  const CategoryContainer = props.canSelect ? 'label' : 'span';

  return (
    <ul className={css[`list_${props.mode}`]}>
      {props.categories.map((category) => (
        <li
          key={category.title}
          className={classNames(css[`item_${props.mode}`], {
            [css.item_checked]:
              (props.selectedCategories && props.selectedCategories?.includes(category)),
          })}
          style={{ backgroundColor: category.color }}
        >
          {props.mode === 'large' && (
            <CategoryContainer>
              <Image
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
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number,
  color: PropTypes.string,
});

DreamCategories.propTypes = {
  canSelect: PropTypes.bool,
  mode: PropTypes.oneOf(['large', 'small']).isRequired,
  selectedCategories: PropTypes.arrayOf(categoryType),
  onToggleCategory: PropTypes.func,
};

export default DreamCategories;
