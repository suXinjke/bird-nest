'use client'

import { useState } from 'react'

export default function ClientThingy() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount(x => x + 1)}>count {count}</button>
    </>
  )
}
