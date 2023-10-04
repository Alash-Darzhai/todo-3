import { useState } from 'react'
import PropTypes from 'prop-types'

import Timer from '../Timer'

export default function Task({
  label,
  onDeleted,
  onToggleDone,
  onToggleEdit,
  done,
  edit,
  id,
  updateTask,
  timer,
  onPlay,
  onPause,
}) {
  const [newLabel, setNewLabel] = useState('')

  const onChangeValue = (e) => {
    setNewLabel(e.target.value)
  }

  const onSubmitEdit = (e) => {
    e.preventDefault()
    updateTask(newLabel, id)
    setNewLabel('')
  }

  const handleBlur = () => {
    updateTask(newLabel, id)
    updateTask(newLabel, id)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      updateTask(newLabel, id)
    }
  }

  let classNames
  if (edit) {
    classNames = 'editing'
  } else if (done) {
    classNames = 'completed'
  } else {
    classNames = ''
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={done}
          onChange={onToggleDone}
        />
        <label>
          <span className="description">{label}</span>
          <Timer timer={timer} onPlay={onPlay} onPause={onPause} />
          <span className="created" />
        </label>
        <button
          className="icon icon-edit"
          type="button"
          onClick={onToggleEdit}
          aria-label="Edit"
        />
        <button
          className="icon icon-destroy"
          type="button"
          onClick={onDeleted}
          aria-label="Destroy"
        />
      </div>

      <form onSubmit={onSubmitEdit}>
        <input
          type="text"
          className="edit"
          defaultValue={label}
          onChange={onChangeValue}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </form>
    </li>
  )
}

Task.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
}

Task.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  updateTask: PropTypes.func.isRequired,
}
