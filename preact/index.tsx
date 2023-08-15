import { render } from 'preact'
import { BrowserRouter, Route, Routes, NavLink, Outlet } from 'react-router-dom'
import '../serve/style.css'

import 'preact/debug'
import Home from './pages/Home'
import Signals from './pages/Signals'
import MobXPage from './pages/mobx'

function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signals">Signals</NavLink>
        <strong className="subHeader">MobX</strong>
        <NavLink to="/mobx/regular">Regular</NavLink>
      </nav>
      <div id="content">
        <Outlet />
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signals" element={<Signals />} />
          <Route path="/mobx/*" element={<MobXPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

render(<App />, document.getElementById('root'))
