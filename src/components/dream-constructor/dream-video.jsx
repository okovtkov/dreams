import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './dream-constructor.module.scss';
import Title from '../title/title';
import VideoPlayer from '../video-player/video-player';
import Button from '../button/button';
import { actions } from './reducer';

function DreamVideo(props) {
  const [video, setVideo] = useState(null);

  const onStop = (recordedChunks) => {
    const recorded = new Blob(recordedChunks, { type: 'video/webm' });
    setVideo(recorded);
  };

  const onClickNextStep = (recorded) => {
    props.dispatch(actions.setVideo(recorded));
    props.dispatch(actions.stepUp());
  };

  return (
    <>
      <Title>Record your dream</Title>
      <p className={css.text}>
        Record your 30-second video! For example,
        start with “Hi, I’m Robin from Sweden and I dream of ...”
      </p>
      <div className={css.videoContainer}>
        <VideoPlayer
          video={video}
          setVideo={(recorded) => setVideo(recorded)}
          onStop={onStop}
        >
          <Button onClick={() => onClickNextStep(video)}>Next step</Button>
        </VideoPlayer>
      </div>
      <label className={css.upload}>
        Can’t record? Upload video instead
        <input type="file" className={css.input} />
      </label>
    </>
  );
}

DreamVideo.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default DreamVideo;
