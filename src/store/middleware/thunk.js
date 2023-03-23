/* Redux Thunk это middleware библиотека, 
которая позволяет вам вызвать action creator, 
возвращая при этом функцию вместо объекта. 
Функция принимает метод dispatch как аргумент, 
чтобы после того, как асинхронная операция завершится, 
использовать его для диспатчинга обычного синхронного экшена, внутри тела функции. */

/* Redux Thunk обучает redux распознавать не только объекты, но и функции.
Помещаем дополнительную логику внутри функции - это и есть thunk */

export function thunk({ getState, dispatch }) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      if (typeof action === 'function') {
        action(dispatch, getState)
      } else {
        return next(action)
      }
      //   console.log(typeof action)
    }
  }
}
