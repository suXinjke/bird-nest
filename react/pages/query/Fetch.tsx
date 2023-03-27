import { useEffect, useState } from 'react'

export default function Fetch() {
  const [data, setData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState('')

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/farfetchd-galar')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText}`)
        }

        return res.json()
      })
      .then(data => setData(data))
      .catch(err => setFailed(err.message))
      .then(() => setLoaded(true))
  }, [])

  if (!loaded) {
    return <div>Loading...</div>
  }

  if (failed) {
    return <div>Failed to fetch: {failed}</div>
  }

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
