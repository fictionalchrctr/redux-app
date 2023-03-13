import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { taskCompleted, titleChanged, taskDeleted } from './store/task'
import configureStore from './store/store'

// high order function - функция, которая принимает в качестве аргумента другие функции
// чистая функция - та функция, которая не зависит от внешних параметров
// каррирование - преобразование одной функции с несколькими аргументами в набор функций, каждая из которых является функцией с одним аргументом
// lodash pipe - передавать в том порядке, в которым мы хотим выполнить функции
// lodash compose - передавать в обратном порядке

const store = configureStore()

const App = () => {
  const [state, setState] = useState(store.getState())
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState())
    })
  }, [])
  const completeTask = (taskId) => {
    store.dispatch(taskCompleted(taskId))
  }
  const changeTitle = (taskId) => {
    store.dispatch(titleChanged(taskId))
  }
  const deleteTask = (taskId) => {
    store.dispatch(taskDeleted(taskId))
  }

  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed:${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>Complete</button>
            <button
              onClick={() => {
                changeTitle(el.id)
              }}
            >
              Change Title
            </button>
            <button onClick={() => deleteTask(el.id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
