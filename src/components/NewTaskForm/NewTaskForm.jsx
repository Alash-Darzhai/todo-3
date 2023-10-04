import { useState } from 'react'
import './NewTaskForm.css'

export default function NewTaskForm({ onItemAdded }) {
  const [state, setState] = useState({
    label: '',
    min: '',
    sec: '',
  })

  const onInputChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      label: e.target.value,
    }))
  }

  const onChangeMin = (e) => {
    setState((prevState) => ({
      ...prevState,
      min: e.target.value,
    }))
  }

  const onChangeSec = (e) => {
    setState((prevState) => ({
      ...prevState,
      sec: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    onItemAdded(state.label, state.min, state.sec)
    setState({
      label: '',
      min: '',
      sec: '',
    })
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          className="new-todo"
          onChange={onInputChange}
          placeholder="What needs to be done?"
          value={state.label}
          autoFocus
        />
        <input
          name="min"
          type="number"
          min="0"
          max="59"
          className="new-todo-form__timer"
          placeholder="Min"
          value={state.min}
          onChange={onChangeMin}
        />
        <input
          name="sec"
          type="number"
          min="0"
          max="59"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={state.sec}
          onChange={onChangeSec}
        />
        <input className="new-todo-form__submit" type="submit" />
      </form>
    </header>
  )
}
