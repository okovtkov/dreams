import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './dream-constructor.module.scss';
import Title from '../title/title';
import VideoPlayer from '../video-player/video-player';
import Button from '../button/button';

function DreamVideo(props) {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);

  const onStop = (options) => {
    const recorded = new Blob(options.recordedChunks, { type: 'video/webm' });
    setVideo(recorded);
    setPreview(options.preview);
  };

  return (
    <>
      <Title>Record your dream</Title>
      <p className={css.text}>
        Record your 30-second video! For example,
        start with “Hi, I’m Robin from Sweden and I dream of ...”
      </p>
      <div className={css.videoContainer}>
        <VideoPlayer video={video} onStop={onStop}>
          <Button onClick={() => props.onClickNextStep({ video, preview })}>Next step</Button>
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
  onClickNextStep: PropTypes.func.isRequired,
};

export default DreamVideo;
