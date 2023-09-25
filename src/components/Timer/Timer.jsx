/* eslint-disable no-unused-expressions */
/* eslint-disable no-labels */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Component } from 'react'

import './Timer.css'

export default class Timer extends Component {
  state = {
    min: this.props.min,
    sec: this.props.sec,
  }

  update = () => {
    const { min, sec } = this.state

    this.setState({ min, sec: sec + 1 })
    sec === 59 && this.setState({ min: min + 1, sec: 0 })
  }

  startTimer = () => {
    this.interval = setInterval(() => this.update(), 1000)
  }

  stopTimer = () => {
    clearInterval(this.interval)
  }

  render() {
    const { min, sec } = this.state
    return (
      <span className="description-timer">
        <button
          type="button"
          className="icon icon-play"
          onClick={this.startTimer}
          aria-label="Play"
        />
        <button
          type="button"
          className="icon icon-pause"
          onClick={this.stopTimer}
          aria-label="Pause"
        />
        <span className="timer">
          {min} min {sec} sec
        </span>
      </span>
    )
  }
}
