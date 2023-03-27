import '../serve/style.css'
import Head from 'next/head'
import ActiveLink from './components/ActiveLink'

export default function Layout({ children, darkTheme = false }) {
  const styles = darkTheme
    ? {
        backgroundColor: 'var(--color-dark)',
        color: 'var(--color-light)',
      }
    : {}

  return (
    <div id="root" style={{ ...styles }}>
      <Head>
        <title>Next Bird Nest</title>
      </Head>
      <nav>
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/dark-theme-clientside">Dark Theme clientside</ActiveLink>
        <ActiveLink href="/dark-theme-cookie">Dark Theme cookie</ActiveLink>
      </nav>
      <div id="content">{children}</div>
    </div>
  )
}
