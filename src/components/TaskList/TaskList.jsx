import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

export default function TaskList({
  todos,
  onDeleted,
  onToggleDone,
  onToggleEdit,
  updateTask,
  onPlay,
  onPause,
}) {
  if (!Array.isArray(todos)) {
    return null
  }
  const elements = todos.map((item) => {
    const { id, label, ...itemProps } = item
    return (
      <Task
        key={id}
        {...itemProps}
        id={id}
        label={label}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEdit={() => onToggleEdit(id)}
        updateTask={updateTask}
        onPlay={() => onPlay(id)}
        onPause={() => onPause(id)}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  updateTask: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.objectOf),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  updateTask: PropTypes.func,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
}
