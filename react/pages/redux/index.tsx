import { configureStore } from '@reduxjs/toolkit'
import { Provider, TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import { counterSlice } from './slice'
import { counterReducer } from './vanilla-reducer'

const store = configureStore({
  reducer: {
    vanilla: counterReducer,
    slice: counterSlice.reducer,
  },
})

type RootState = ReturnType<typeof store['getState']>
type AppDispatch = typeof store['dispatch']

const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

function VanillaConsumer() {
  const count = useAppSelector(x => x.vanilla.count)
  const dispatch = useAppDispatch()

  return (
    <div>
      <span>the count from vanilla reducer is {count} </span>
      <button onClick={() => dispatch({ type: 'INCREASE' })}>Increase</button>
    </div>
  )
}

function ToolkitConsumer() {
  const count = useAppSelector(x => x.slice.count)
  const dispatch = useAppDispatch()

  return (
    <div>
      <span>the count from slice reducer is {count} </span>
      <button onClick={() => dispatch(counterSlice.actions.increase())}>Increase</button>
    </div>
  )
}

export default function ReduxProvider() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="vanilla" element={<VanillaConsumer />} />
        <Route path="toolkit" element={<ToolkitConsumer />} />
      </Routes>
    </Provider>
  )
}
