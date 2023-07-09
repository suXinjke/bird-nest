import { cookies } from 'next/headers'
import { MyContextProvider } from './MyContextProvider'

export default function Layout({ children }) {
  const cookieStore = cookies()
  const darkMode = cookieStore.get('darkMode')?.value === '1'

  return <MyContextProvider darkModeInitial={darkMode}>{children}</MyContextProvider>
}
