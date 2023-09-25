import { Component } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'
import './App.css'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [
      this.createTodoItem('Completed task', 0, 0),
      this.createTodoItem('Editing task', 0, 0),
      this.createTodoItem('Active task', 0, 0),
    ],
    filter: 'all',
  }

  createTodoItem(label, min = 0, sec = 0) {
    return {
      label,
      done: false,
      edit: false,
      // eslint-disable-next-line no-plusplus
      id: this.maxId++,
      min,
      sec,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.filter((el) => el.id !== id),
      }
    })
  }

  deletedCompletedItems = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((el) => !el.done)
      return {
        todoData: newArr,
      }
    })
  }

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, Number(min), Number(sec))
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((item) => {
          return item.id === id ? { ...item, done: !item.done } : item
        }),
      }
    })
  }

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((item) => {
          return item.id === id ? { ...item, edit: true } : item
        }),
      }
    })
  }

  updateTask = (labelUpdate, id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((item) => {
          return item.id === id
            ? { ...item, label: labelUpdate, edit: false }
            : item
        }),
      }
    })
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  /* eslint no-nested-ternary: "error" */
  render() {
    const { todoData, filter, edit } = this.state
    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount
    let filteredItems

    if (filter === 'all') {
      filteredItems = todoData
    } else if (filter === 'active') {
      filteredItems = todoData.filter((item) => !item.done)
    } else {
      filteredItems = todoData.filter((item) => item.done)
    }

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={filteredItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            edit={edit}
            updateTask={this.updateTask}
          />
        </section>
        <Footer
          itemsLeft={todoCount}
          deletedCompletedItems={this.deletedCompletedItems}
          filter={filter}
          onFilterChange={this.onFilterChange}
          onToggleDone={this.onToggleDone}
        />
      </section>
    )
  }
}
