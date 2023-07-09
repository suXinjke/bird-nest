'use client'
import { useMyContextProvider } from '../MyContextProvider'

function DarkThemeClientsidePage() {
  const { darkMode, setDarkModeClientSide } = useMyContextProvider()

  return (
    <>
      <label htmlFor="darkModeCheckbox">Set Dark Theme</label>
      <input
        id="darkModeCheckbox"
        type="checkbox"
        checked={darkMode}
        onChange={e => {
          setDarkModeClientSide(e.target.checked)
        }}
      />

      <p>
        This way of setting it has problems - it's set clientside, so there's momentarily flicker
        during initial opening of the page
      </p>
    </>
  )
}

export default DarkThemeClientsidePage
