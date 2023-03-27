import { useEffect, useState } from 'react'
import Layout from '../../Layout'

function useDarkTheme() {
  const [darkTheme, setDarkTheme] = useState(false)

  useEffect(() => {
    try {
      const initialValue = JSON.parse(localStorage.getItem('darkTheme')).value
      setDarkTheme(initialValue)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('darkTheme', JSON.stringify({ value: darkTheme }))
  }, [darkTheme])

  return [darkTheme, setDarkTheme] as const
}

function DarkThemeClientsidePage() {
  const [darkTheme, setDarkTheme] = useDarkTheme()
  return (
    <Layout darkTheme={darkTheme}>
      <label htmlFor="darkThemeCheckbox">Set Dark Theme</label>
      <input
        id="darkThemeCheckbox"
        type="checkbox"
        checked={darkTheme}
        onChange={e => {
          setDarkTheme(e.target.checked)
        }}
      />

      <p>
        This way of setting it has problems - it's set clientside, so there's momentarily flicker
        during initial opening of the page
      </p>
    </Layout>
  )
}

export default DarkThemeClientsidePage
