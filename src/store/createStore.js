export function createStore(reducer, initialState) {
  let state = initialState
  let listeners = []
  // getState - получить состояние
  function getState() {
    return state
  }
  // dispatch - изменить состояние (отправляем что-то в наш store)
  function dispatch(action) {
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
  }
  // subscribe - подписаться на изменение состояния (функция, которая будет добавлять нoвых слушателей, которым необходимо получать обновления)
  function subscribe(listener) {
    listeners.push(listener)
  }
  return { getState, dispatch, subscribe }
}
