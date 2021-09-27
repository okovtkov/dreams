import classNames from 'classnames';
import React, { useState, useRef, useCallback } from 'react';
import css from './dream-constructor.module.scss';
import Title from '../title/title';
import VideoPlayer from '../video-player/video-player';
import Button from '../button/button';

export default function DreamVideo(props) {
  const videoRef = useRef();
  const [allowed, setAllowed] = useState(false);
  const [video, setVideo] = useState(null);
  const [playerState, setPlayerState] = useState('stoped');
  const [streaming, setStreaming] = useState(null);
  const [, setIntervalID] = useState(null);
  const [, setTimeoutID] = useState(null);
  const [seconds, setSeconds] = useState(0);

  const onStop = (recordedChunks) => {
    const recorded = new Blob(recordedChunks, { type: 'video/webm' });
    setVideo(recorded);
  };

  const stop = useCallback(() => {
    setIntervalID((interval) => clearInterval(interval));
    setTimeoutID((timeout) => clearTimeout(timeout));

    streaming.getTracks().forEach((track) => track.stop());
    setPlayerState('stoped');
  }, [streaming]);

  const timer = () => {
    setSeconds((old) => old + 1);
  };

  const recording = () => {
    if (playerState === 'recording') {
      stop();
      return;
    }

    const recorder = new MediaRecorder(streaming);
    const data = [];

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.onstop = () => onStop(data);
    recorder.start();
    setPlayerState('recording');
    const timeout = setTimeout(() => {
      if (streaming) stop();
    }, 30000);
    const interval = setInterval(timer, 1000);
    setIntervalID(interval);
    setTimeoutID(timeout);
  };

  const start = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStreaming(stream);
        setAllowed(true);
        videoRef.current.srcObject = stream;
      });
  };

  const reset = () => {
    setSeconds(0);
    start();
    setVideo(null);
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
          allowed={allowed}
          video={video}
          playerState={playerState}
          streaming={streaming}
          seconds={seconds}
          videoRef={videoRef}
          start={start}
          onStop={onStop}
        />
      </div>
      {!video && (
        <Button
          transparent
          disabled={!allowed}
          onClick={playerState === 'recording' ? stop : recording}
          className={classNames(css.recording, {
            [css.recording_active]: playerState === 'recording',
          })}
        >
          {playerState === 'recording' ? 'End recording' : 'Start recording'}
        </Button>
      )}
      {video && (
        <div className={css.buttonsWrapper}>
          <Button transparent onClick={reset}>Record again</Button>
          <Button onClick={() => props.onClickNextStep(video)}>Next step</Button>
        </div>
      )}
      <label className={css.upload}>
        Can’t record? Upload video instead
        <input type="file" className={css.input} />
      </label>
    </>
  );
}
