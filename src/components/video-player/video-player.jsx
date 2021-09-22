/* eslint-disable jsx-a11y/media-has-caption */
import classNames from 'classnames';
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import css from './video-player.module.scss';
import Title from '../title/title';
import Button from '../button/button';

export default function VideoPlayer(props) {
  const [allowed, setAllowed] = useState(false);
  const [streaming, setStreaming] = useState(null);
  const [playerState, setPlayerState] = useState('stoped');
  const [startedAt, setStartedAt] = useState(0);
  const [link, setLink] = useState('');
  const [seconds, setSeconds] = useState(0);
  const videoRef = useRef();

  const onStop = (recordedChunks) => {
    const recorded = new Blob(recordedChunks, { type: 'video/webm' });
    setLink(URL.createObjectURL(recorded));
  };

  const stop = useCallback(() => {
    streaming.getTracks().forEach((track) => track.stop());
    setStreaming(null);
    setPlayerState('stoped');
  }, [streaming]);

  const recording = useCallback(() => {
    const recorder = new MediaRecorder(streaming);
    const data = [];

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.onstop = () => onStop(data);
    recorder.start();
    setPlayerState('recording');
    setStartedAt(Date.now());
  }, [streaming]);

  useEffect(() => {
    if (playerState === 'stoped') return;
    const ticker = () => {
      const time = Math.floor((Date.now() - startedAt) / 1000);
      setSeconds(time);
      if (playerState === 'recording' && time >= 30) stop();
      else setTimeout(ticker, 1000);
    };
    ticker();
  }, [stop, playerState, startedAt]);

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
    setLink('');
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
        <div
          className={classNames(css.timeline, {
            [css.timeline_unactive]: streaming === null,
          })}
        >
          <div className={css.lineWrapper}>
            <div
              className={css.line}
            />
            <div
              className={classNames(css.slider, {
                [css.slider_active]: playerState === 'recording',
              })}
            />
          </div>
          <span className={css.time}>
            {seconds}
            /30
          </span>
        </div>
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
      <Button
        transparent
        disabled={!allowed}
        onClick={playerState === 'recording' ? stop : recording}
        className={classNames(css.recording, {
          [css.recording_active]: playerState === 'recording',
          [css.recording_hidden]: link,
        })}
      >
        {playerState === 'recording' ? 'End recording' : 'Start recording'}
      </Button>
      <div
        className={classNames(css.buttonsWrapper, {
          [css.buttonsWrapper_hidden]: !link,
        })}
      >
        <Button transparent onClick={() => reset()}>Record again</Button>
        <Button onClick={props.onClickNextStep}>Next step</Button>
      </div>
      <label className={css.upload}>
        Can’t record? Upload video instead
        <input type="file" className={css.input} />
      </label>
    </>
  );
}
