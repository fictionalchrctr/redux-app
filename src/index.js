import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {
  completeTask,
  titleChanged,
  taskDeleted,
  getTasks,
  loadTasks,
  getTasksLoadingStatus,
  createTask,
} from './store/task'
import configureStore from './store/store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { getError } from './store/errors'

/* high order function - функция, которая принимает в качестве аргумента другие функции
чистая функция - та функция, которая не зависит от внешних параметров
каррирование - преобразование одной функции с несколькими аргументами в набор функций, каждая из которых является функцией с одним аргументом
lodash pipe - передавать в том порядке, в которым мы хотим выполнить функции
lodash compose - передавать в обратном порядке */

// Хуки react-redux:
/* useSelector - хук, с помощью которого получаем данные из store, рименяется в совокупонсти с provider
  useDispatch - хук, вызывающий метод dispatch (диспетчер) */

const store = configureStore()

const App = () => {
  const state = useSelector(getTasks())
  const isLoading = useSelector(getTasksLoadingStatus())
  const error = useSelector(getError())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTasks())
  }, [dispatch])

  const addNewTask = () => {
    dispatch(
      createTask({ userId: 1, title: 'some new task', completed: false })
    )
  }

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId))
  }

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId))
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <>
      <h1>App</h1>
      <button onClick={addNewTask}>Add new task</button>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.title}</p>
            <p>{`Completed:${el.completed}`}</p>
            <button onClick={() => dispatch(completeTask(el.id))}>
              Complete
            </button>
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
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
)
