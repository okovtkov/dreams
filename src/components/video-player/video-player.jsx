/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/media-has-caption */
import classNames from 'classnames';
import React, { useState, useCallback, useRef } from 'react';
import css from './video-player.module.scss';
import Button from '../button/button';

export default function VideoPlayer(props) {
  const videoRef = useRef();
  const [allowed, setAllowed] = useState(false);
  const [playerState, setPlayerState] = useState('stoped');
  const [streaming, setStreaming] = useState(null);
  const [, setIntervalID] = useState(null);
  const [, setTimeoutID] = useState(null);
  const [seconds, setSeconds] = useState(0);

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
    recorder.onstop = () => props.onStop(data);
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
    props.setVideo(null);
  };

  return (
    <>
      <div className={css.videoContainer}>
        <video
          ref={videoRef}
          className={classNames(css.video, {
            [css.video_unactive]: props.video,
          })}
          autoPlay
          muted
        />
        {!props.video && (
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
          src={props.video ? URL.createObjectURL(props.video) : null}
          className={classNames(css.player, {
            [css.player_active]: props.video,
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
      {!props.video && (
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
      {props.video && (
        <div className={css.buttonsWrapper}>
          <Button transparent onClick={reset}>Record again</Button>
          {props.children}
        </div>
      )}
    </>
  );
}
