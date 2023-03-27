import { PayloadAction } from '@reduxjs/toolkit'

export function counterReducer(state = { count: 0 }, action: PayloadAction) {
  switch (action.type) {
    case 'INCREASE': {
      return { ...state, count: state.count + 1 }
    }
    default: {
      return state
    }
  }
}
