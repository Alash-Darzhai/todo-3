/* eslint-disable no-plusplus */
import { useState, useEffect } from 'react'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'

import './App.css'

export default function App() {
  function createTodoItem(label, min = 0, sec = 0) {
    const totalSeconds = +min * 60 + +sec
    return {
      label,
      done: false,
      edit: false,
      id: Date.now() + Math.floor(Math.random() * 100),
      timer: totalSeconds,
      min,
      sec,
      pause: true,
    }
  }

  const [todoData, setTodoData] = useState([])

  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const interval = setInterval(() => {
      setTodoData((data) => {
        const newArr = data.map((el) => {
          if (el.timer === 0) {
            return el
          }
          if (!el.pause) {
            // eslint-disable-next-line no-param-reassign
            el.timer -= 1
          }
          return el
        })
        return newArr
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const onPlay = (id) => {
    setTodoData((prevTodoData) => {
      const newArr = prevTodoData.map((el) =>
        el.id === id ? { ...el, pause: false } : { ...el },
      )
      return newArr
    })
  }

  const onPause = (id) => {
    setTodoData((prevTodoData) => {
      const newArr = prevTodoData.map((el) =>
        el.id === id ? { ...el, pause: true } : { ...el },
      )
      return newArr
    })
  }

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => el.id !== id))
  }

  const deletedCompletedItems = () => {
    setTodoData((prevTodoData) => prevTodoData.filter((el) => !el.done))
  }

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, Number(min), Number(sec))
    return setTodoData([...todoData, newItem])
  }

  const onToggleDone = (id) => {
    setTodoData((prevTodoData) => {
      return prevTodoData.map((item) => {
        return item.id === id ? { ...item, done: !item.done } : item
      })
    })
  }

  const onToggleEdit = (id) => {
    setTodoData((prevTodoData) => {
      return prevTodoData.map((item) => {
        return item.id === id ? { ...item, edit: true } : item
      })
    })
  }

  const updateTask = (labelUpdate, id) => {
    setTodoData((arr) => {
      return arr.map((item) => {
        return item.id === id
          ? { ...item, label: labelUpdate, edit: false }
          : item
      })
    })
  }

  const filteredItems = todoData.filter((item) => {
    if (filter === 'active') {
      return !item.done
    }
    if (filter === 'completed') {
      return item.done
    }
    return true
  })

  const doneCount = todoData.filter((el) => el.done).length
  const todoCount = todoData.length - doneCount

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={filteredItems}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          updateTask={updateTask}
          onPlay={onPlay}
          onPause={onPause}
        />
      </section>
      <Footer
        itemsLeft={todoCount}
        deletedCompletedItems={deletedCompletedItems}
        filter={filter}
        onFilterChange={setFilter}
      />
    </section>
  )
}
