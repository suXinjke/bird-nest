import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes, NavLink, Outlet } from 'react-router-dom'
import '../serve/style.css'

import Home from './pages/Home'
import Redux from './pages/redux'
import Query from './pages/query'
import DragResize from './pages/DragResize'
import ManyInputs from './pages/ManyInputs'
import ManyInputsMobx from './pages/ManyInputsMobx'
import GlobalContextReduxDevTools from './pages/GlobalContextReduxDevTools'

const LazyPage = lazy(() => import('./pages/Lazy'))

function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/lazy">Lazy</NavLink>
        <NavLink to="/many-inputs">Many Inputs</NavLink>
        <NavLink to="/many-inputs-mobx">Many Inputs (MobX)</NavLink>
        <NavLink to="/drag-resize">Drag / Reisze</NavLink>
        <NavLink to="/global-context-redux-dev-tools">Global ctx+Redux DevTools</NavLink>
        <strong className="subHeader">Query</strong>
        <NavLink to="/query/fetch">Fetch</NavLink>
        <NavLink to="/query/fetch-strict">WebSocket (Strict mode)</NavLink>
        <NavLink to="/query/react-query">React Query</NavLink>
        <strong className="subHeader">Redux</strong>
        <NavLink to="/redux/vanilla">Vanilla</NavLink>
        <NavLink to="/redux/toolkit">Toolkit</NavLink>
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
          <Route path="/drag-resize" element={<DragResize />} />
          <Route path="/many-inputs" element={<ManyInputs />} />
          <Route path="/many-inputs-mobx" element={<ManyInputsMobx />} />
          <Route path="/global-context-redux-dev-tools" element={<GlobalContextReduxDevTools />} />
          <Route path="/query/*" element={<Query />} />
          <Route
            path="/lazy"
            element={
              <Suspense>
                <LazyPage />
              </Suspense>
            }
          />
          <Route path="/redux/*" element={<Redux />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
