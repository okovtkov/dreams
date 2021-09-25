/* eslint-disable jsx-a11y/media-has-caption */
import classNames from 'classnames';
import React, {
  useState,
  useRef,
  useCallback,
} from 'react';
import css from './video-player.module.scss';
import Title from '../title/title';
import Button from '../button/button';

export default function VideoPlayer(props) {
  const [allowed, setAllowed] = useState(false);
  const [streaming, setStreaming] = useState(null);
  const [playerState, setPlayerState] = useState('stoped');
  const [link, setLink] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [, setIntervalID] = useState(null);
  const [, setTimeoutID] = useState(null);
  const videoRef = useRef();

  const onStop = (recordedChunks) => {
    const recorded = new Blob(recordedChunks, { type: 'video/webm' });
    setLink(URL.createObjectURL(recorded));
    props.onClickChangeVideo(recorded);
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
    setLink(null);
    setSeconds(0);
    start();
  };

  return (
    <>
      <Title>Record your dream</Title>
      <p className={css.text}>
        Record your 30-second video! For example,
        start with “Hi, I’m Robin from Sweden and I dream of ...”
      </p>
      <div className={css.videoContainer}>
        <video
          ref={videoRef}
          className={classNames(css.video, {
            [css.video_unactive]: link,
          })}
          autoPlay
          muted
        />
        {!link && (
          <div className={css.timeline}>
            <div className={classNames(css.line, {
              [css.line_playing]: playerState === 'recording',
            })}
            />
            <span className={css.time}>
              {seconds}
              /30
            </span>
          </div>
        )}
        <video
          src={link}
          className={classNames(css.player, {
            [css.player_active]: link,
          })}
          controls
        />
        <button
          type="button"
          onClick={start}
          className={classNames(css.allow, {
            [css.allowed]: allowed,
          })}
        >
          Allow camera access to start recording
        </button>
      </div>
      {!link && (
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
      {link && (
        <div className={css.buttonsWrapper}>
          <Button transparent onClick={reset}>Record again</Button>
          <Button onClick={props.onClickNextStep}>Next step</Button>
        </div>
      )}
      <label className={css.upload}>
        Can’t record? Upload video instead
        <input type="file" className={css.input} />
      </label>
    </>
  );
}
