import { createAction, createReducer } from '@reduxjs/toolkit'

const initialState = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: false },
]

const update = createAction('task/updated')
const remove = createAction('task/removed')

// const TASK_UPDATED = 'task/updated'
// const TASK_DELETED = 'task/deleted'

export function taskCompleted(id) {
  return update({ id, completed: true })
  //   return {
  //     type: TASK_UPDATED,
  //     payload: { id, completed: true },
  //   }
}

export function titleChanged(id) {
  return update({ id, title: `New title for ${id}` })
  //   return {
  //     type: TASK_UPDATED,
  //     payload: { id, title: `New title for ${id}` },
  //   }
}

export function taskDeleted(id) {
  return remove({ id })
  //   return {
  //     type: TASK_DELETED,
  //     payload: { id },
  //   }
}

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(update, (state, action) => {
      const elementIndex = state.findIndex((el) => el.id === action.payload.id)
      state[elementIndex] = { ...state[elementIndex], ...action.payload }
    })
    .addCase(remove, (state, action) => {
      return state.filter((el) => el.id !== action.payload.id)
    })
})

// reducer - функция, внктри имеющая несколько вариантов исполнения, каждый из которых возвращает новое состояние
// Каждая из вложенных функций должна быть чистой(pure)
// state - то состояние, которое необходимо обновить
// action - JS-объект с обязательным полем type, по которому мы будем определять как состояние будет изменяться
// action = { type: 'task/completed', payload: { id: taskId } }
// type - что необходимо сделать
// payload - необходимые данные для изменения объекта

// function taskReducer(state = [], action) {
//   switch (action.type) {
//     case update.type: {
//       const newArray = [...state]
//       const elementIndex = newArray.findIndex(
//         (el) => el.id === action.payload.id
//       )
//       newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload }
//       return newArray
//     }
//     case remove.type: {
//       return state.filter((el) => el.id !== action.payload.id)
//     }
//     default:
//       return state
//   }
// }

export default taskReducer
