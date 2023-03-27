import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

function fetchDuck(name: string) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res => {
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`)
    }

    return res.json()
  })
}

export default function ReactQuery() {
  const [name, setName] = useState('farfetchd-galar')
  const { status, error, data } = useQuery({
    queryKey: ['poke', name],
    queryFn: () => fetchDuck(name),
    retry: false,
    staleTime: Infinity,
  })

  return (
    <>
      <div>
        <input
          defaultValue={name}
          onBlur={e => {
            setName(e.currentTarget.value)
          }}
        />
      </div>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'error' && <div>Failed to fetch: {(error as Error).message}</div>}
      {status === 'success' && (
        <>
          <img src={data.sprites.front_default} />
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
      )}
    </>
  )
}
