/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/media-has-caption */
import classNames from 'classnames';
import React from 'react';
import css from './video-player.module.scss';

export default function VideoPlayer(props) {
  return (
    <div className={css.videoContainer}>
      <video
        ref={props.videoRef}
        className={classNames(css.video, {
          [css.video_unactive]: props.video,
        })}
        autoPlay
        muted
      />
      {!props.video && (
        <div className={css.timeline}>
          <div className={classNames(css.line, {
            [css.line_playing]: props.playerState === 'recording',
          })}
          />
          <span className={css.time}>
            {props.seconds}
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
        onClick={props.start}
        className={classNames(css.allow, {
          [css.allowed]: props.allowed,
        })}
      >
        Allow camera access to start recording
      </button>
    </div>
  );
}
