import { useState, createContext, useContext, useRef, useEffect } from 'react'

const itemCount = 100
const GlobalStateContext = createContext(null)

const reduxDevTools = window['__REDUX_DEVTOOLS_EXTENSION__']

function _useGlobalState() {
  const [byId, setById] = useState(() => {
    const result = {}
    for (let i = 0; i < itemCount; i++) {
      result[i] = {
        id: i,
        value: 'text_' + i,
      }
    }
    return result
  })
  const [ids, setIds] = useState(() => Array.from({ length: itemCount }, (_, i) => i))
  const idCounter = useRef(itemCount + 1)

  const devTools = useRef(null)
  const latestDevToolsOperations = useRef(['init'])

  useEffect(() => {
    if (reduxDevTools) {
      devTools.current = reduxDevTools.connect({ name: 'GlobalState' })
      devTools.current.init()
      return () => {
        reduxDevTools.disconnect()
      }
    }
  }, [])

  useEffect(() => {
    if (devTools.current) {
      devTools.current.send('GlobalState/' + latestDevToolsOperations.current.join('/'), {
        byId,
        ids,
      })
      latestDevToolsOperations.current = []
    }
  }, [byId, ids])

  const value = {
    byId,
    ids,
    updateById: function (id, value) {
      setById(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          value,
        },
      }))
      latestDevToolsOperations.current.push('update')
    },
    removeById: function (id) {
      setById(prev => {
        const newState = { ...prev }
        delete newState[id]
        return newState
      })
      setIds(prev => prev.filter(prevId => prevId !== id))
      latestDevToolsOperations.current.push('remove')
    },
    add: function () {
      const id = idCounter.current
      setById(prev => ({
        ...prev,
        [id]: {
          id,
          value: 'text_' + id,
        },
      }))
      setIds(prev => [id, ...prev])

      idCounter.current++
      latestDevToolsOperations.current.push('add')
    },
  }

  return value
}

function GlobalStateProvider({ children }) {
  const value = _useGlobalState()

  return <GlobalStateContext.Provider value={value}>{children}</GlobalStateContext.Provider>
}

function useGlobalState() {
  return useContext(GlobalStateContext) as ReturnType<typeof _useGlobalState>
}

function Content() {
  const { byId, ids, updateById, removeById, add } = useGlobalState()

  return (
    <>
      <button
        onClick={() => {
          add()
        }}
      >
        add new
      </button>
      {ids.map(id => (
        <div key={id}>
          <input
            value={byId[id].value}
            onChange={e => {
              updateById(id, e.target.value)
            }}
          />
          <button
            onClick={() => {
              removeById(id)
            }}
          >
            remove
          </button>
        </div>
      ))}
    </>
  )
}

export default function GlobalContextReduxDevTools() {
  return (
    <GlobalStateProvider>
      <Content />
    </GlobalStateProvider>
  )
}
