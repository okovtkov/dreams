import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import css from './dream-constructor.module.scss';
import Title from '../title/title';
import Button from '../button/button';
import completeImage from './complete.png';

function DreamFinished(props) {
  const onClose = () => {
    props.onClose();
    props.resetSteps();
  };

  return (
    <div className={css.finishedWrapper}>
      <div className={css.complete}>
        <Image src={completeImage} alt="выполнено" />
      </div>
      <Title>Your dream has been sent for approval!</Title>
      <p className={css.text}>
        You will recieve an email when your dream is published with a link to it.
        {' '}
        If you wish to remove your dream, there will be a removal link in the email, so please
        save it.
      </p>
      <Button onClick={onClose}>Close</Button>
    </div>
  );
}

DreamFinished.propTypes = {
  onClose: PropTypes.func,
};

export default DreamFinished;
