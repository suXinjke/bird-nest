import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <span>the count is {count} </span>
      <button onClick={() => setCount(x => x + 1)}>Increase</button>
    </div>
  )
}
