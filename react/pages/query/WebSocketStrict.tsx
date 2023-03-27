import { useEffect, useRef, useState } from 'react'

export default function FetchStrict() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    let count = 1
    const socket = new WebSocket('wss://ws.postman-echo.com/raw')
    let timeoutHandle: number

    socket.addEventListener('open', () => {
      setMessages(prev => [`[${new Date().toISOString()}] Connected`, ...prev])

      timeoutHandle = setInterval(() => {
        socket.send(`Auto message ${count}`)
        count++
      }, 1000)
    })

    socket.addEventListener('message', event => {
      setMessages(prev => [`[${new Date().toISOString()}] ${event.data}`, ...prev])
    })

    // remove the cleanup - messages appear twice as fast
    return () => {
      socket.close()
      clearInterval(timeoutHandle)
    }
  }, [])

  return (
    <div>
      {messages.map((message, i) => (
        <div key={i}>{message}</div>
      ))}
    </div>
  )
}
