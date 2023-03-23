import { createAction, createSlice } from '@reduxjs/toolkit'
import todosService from '../services/todos.service'
import { setError } from './errors'

const initialState = { entities: [], isLoading: true }

// const update = createAction('task/updated')
// const remove = createAction('task/removed')

// const TASK_UPDATED = 'task/updated'
// const TASK_DELETED = 'task/deleted'

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      )
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      }
    },
    remove(state, action) {
      return state.entities.filter((el) => el.id !== action.payload.id)
    },
    loadTaskRequested(state) {
      state.isLoading = true
    },

    taskRequestFailed(state, action) {
      state.isLoading = false
    },
    taskAdded(state, action) {
      state.entities.push(action.payload)
    },
  },
})

const { actions, reducer: taskReducer } = taskSlice
const {
  recived,
  update,
  remove,
  taskRequestFailed,
  taskAdded,
  loadTaskRequested,
} = actions
const taskRequested = createAction('task/taskRequested')

export function loadTasks() {
  return async function (dispatch) {
    dispatch(loadTaskRequested())
    try {
      const data = await todosService.fetch() // data - массив тудушек с эндпоинта
      dispatch(recived(data))
    } catch (error) {
      dispatch(taskRequestFailed())
      dispatch(setError(error.message))
    }
  }
}

export function createTask(task) {
  return async function (dispatch) {
    dispatch(taskRequested())
    try {
      const data = await todosService.create(task)
      dispatch(taskAdded(data))
    } catch (error) {
      dispatch(taskRequestFailed())
      dispatch(setError(error.message))
    }
  }
}

// export const loadTask = (id) => (dispatch, getState) => {
//   dispatch(update({ id, completed: true }))
// }

// action taskCompleted
export function completeTask(id) {
  return function (dispatch, getState) {
    dispatch(update({ id, completed: true }))
  }
}

// action titleChanged
export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` })
}

// action taskDeleted
export function taskDeleted(id) {
  return remove({ id })
  //   return {
  //     type: TASK_DELETED,
  //     payload: { id },
  //   }
}

// useSelectorы
export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

// reducer - функция, внктри имеющая несколько вариантов исполнения, каждый из которых возвращает новое состояние
// Каждая из вложенных функций должна быть чистой(pure)
// state - то состояние, которое необходимо обновить
// action - JS-объект с обязательным полем type, по которому мы будем определять как состояние будет изменяться
// action = { type: 'task/completed', payload: { id: taskId } }
// type - что необходимо сделать
// payload - необходимые данные для изменения объекта

export default taskReducer
