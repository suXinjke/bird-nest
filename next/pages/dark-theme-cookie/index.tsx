import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import Layout from '../../Layout'

function useDarkThemeCookie(initialValue) {
  const [darkTheme, setDarkTheme] = useState(initialValue)

  useEffect(() => {}, [])

  useEffect(() => {
    Cookies.set('darkTheme', darkTheme ? '1' : '0', {
      sameSite: 'Strict',
    })
  }, [darkTheme])

  return [darkTheme, setDarkTheme] as const
}

export async function getServerSideProps(context) {
  return {
    props: {
      initialDarkTheme: context.req.cookies.darkTheme === '1',
    },
  }
}

function DarkThemeClientsidePage({ initialDarkTheme }) {
  const [darkTheme, setDarkTheme] = useDarkThemeCookie(initialDarkTheme)
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
        This stores dark theme in clientside cookie, which allows to read it on server to render
        relevant styles: check the received HTML. There should be no client-side flicker.
      </p>
    </Layout>
  )
}

export default DarkThemeClientsidePage
