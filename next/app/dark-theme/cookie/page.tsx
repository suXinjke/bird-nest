'use client'

import { useMyContextProvider } from '../MyContextProvider'

function DarkThemeClientsidePage() {
  const { darkMode, setDarkModeCookie } = useMyContextProvider()

  return (
    <>
      <label htmlFor="darkModeCheckbox">Set Dark Theme</label>
      <input
        id="darkModeCheckbox"
        type="checkbox"
        checked={darkMode}
        onChange={e => {
          setDarkModeCookie(e.target.checked)
        }}
      />

      <p>
        This stores dark theme in clientside cookie, which allows to read it on server to render
        relevant styles: check the received HTML. There should be no client-side flicker.
      </p>
    </>
  )
}

export default DarkThemeClientsidePage
