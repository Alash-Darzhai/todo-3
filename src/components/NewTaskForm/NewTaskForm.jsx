import { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }

  onInputChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onChangeMin = (e) => {
    this.setState({
      min: e.target.value,
    })
  }

  onChangeSec = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { onItemAdded } = this.props
    const { label, min, sec } = this.state
    onItemAdded(label, min, sec)
    this.setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  render() {
    const { label, min, sec } = this.state

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            onChange={this.onInputChange}
            placeholder="What needs to be done?"
            value={label}
            autoFocus
          />
          <input
            name="min"
            type="number"
            min="0"
            max="59"
            className="new-todo-form__timer"
            placeholder="Min"
            value={min}
            onChange={this.onChangeMin}
          />
          <input
            name="sec"
            type="number"
            min="0"
            max="59"
            className="new-todo-form__timer"
            placeholder="Sec"
            value={sec}
            onChange={this.onChangeSec}
          />
          <input className="new-todo-form__submit" type="submit" />
        </form>
      </header>
    )
  }
}
