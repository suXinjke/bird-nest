import '../../serve/style.css'
import ActiveLink from '../components/ActiveLink'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

function useDarkModeStyles() {
  const cookieStore = cookies()
  const darkMode = cookieStore.get('darkMode')?.value === '1'
  return darkMode
    ? {
        backgroundColor: 'var(--color-dark)',
        color: 'var(--color-light)',
      }
    : {}
}

export const metadata: Metadata = {
  title: 'Next Bird Nest',
}

export default function Layout({ children }) {
  const darkModeStyles = useDarkModeStyles()

  return (
    <html>
      <body>
        <div id="root" style={darkModeStyles}>
          <nav>
            <ActiveLink href="/">Home</ActiveLink>
            <ActiveLink href="/dark-theme/clientside">Dark Theme clientside</ActiveLink>
            <ActiveLink href="/dark-theme/cookie">Dark Theme cookie</ActiveLink>
          </nav>
          <div id="content">{children}</div>
        </div>
      </body>
    </html>
  )
}
