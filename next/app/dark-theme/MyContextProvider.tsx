'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const initialContextState = {
  darkMode: false,
}

export const MyContext = createContext({
  ...initialContextState,
  setDarkModeClientSide: (darkMode: boolean) => {},
  setDarkModeCookie: (darkMode: boolean) => {},
})

export const useMyContextProvider = () => useContext(MyContext)

export function MyContextProvider({ children, darkModeInitial }) {
  const [state, setState] = useState(() => {
    if (darkModeInitial) {
      return {
        ...initialContextState,
        darkMode: true,
      }
    } else {
      try {
        const initialValue = JSON.parse(localStorage.getItem('darkMode')).value
        return { ...initialContextState, darkMode: initialValue }
      } catch (err) {
        return initialContextState
      }
    }
  })

  useEffect(() => {
    const node = document.querySelector('#root') as HTMLDivElement
    node.style.backgroundColor = state.darkMode ? 'var(--color-dark)' : ''
    node.style.color = state.darkMode ? 'var(--color-light)' : ''
  }, [state.darkMode])

  const setDarkModeClientSide = (darkMode: boolean) => {
    setState(x => ({ ...x, darkMode }))
    localStorage.setItem('darkMode', JSON.stringify({ value: darkMode }))
  }

  const setDarkModeCookie = (darkMode: boolean) => {
    setState(x => ({ ...x, darkMode }))
    Cookies.set('darkMode', darkMode ? '1' : '0', {
      sameSite: 'Strict',
    })
  }

  return (
    <MyContext.Provider value={{ ...state, setDarkModeClientSide, setDarkModeCookie }}>
      {children}
    </MyContext.Provider>
  )
}
