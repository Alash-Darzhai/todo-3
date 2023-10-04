/* eslint-disable no-unused-expressions */
/* eslint-disable no-labels */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */

export default function Timer({ done, timer, onPlay, onPause }) {
  // eslint-disable-next-line no-unused-vars
  const timerView = done
    ? '00:00'
    : `${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(
        timer % 60,
      ).padStart(2, '0')}`

  return (
    <span className="description-timer">
      <button
        type="button"
        className="icon icon-play"
        aria-label="Play"
        onClick={onPlay}
      />
      <button
        type="button"
        className="icon icon-pause"
        aria-label="Pause"
        onClick={onPause}
      />
      <span className="timer">{timerView}</span>
    </span>
  )
}
