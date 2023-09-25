import { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'
import './Footer.css'

export default class Footer extends Component {
  render() {
    const { itemsLeft, deletedCompletedItems, filter, onFilterChange } =
      this.props

    return (
      <footer className="footer">
        <span className="todo-count">{itemsLeft} items left</span>
        <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        <button
          className="clear-completed"
          type="button"
          onClick={deletedCompletedItems}
        >
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.defaultProps = {
  itemsLeft: 0,
  deletedCompletedItems: () => {},
  filter: 'all',
  onFilterChange: () => {},
}

Footer.propTypes = {
  itemsLeft: PropTypes.number,
  deletedCompletedItems: PropTypes.func,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
}
