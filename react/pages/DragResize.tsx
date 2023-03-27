import { useState, useLayoutEffect, useRef } from 'react'

interface Vec2D {
  x: number
  y: number
}

type MeaningfulOperation = 'drag' | 'resize'

function Box() {
  const [operation, setOperation] = useState<'idle' | MeaningfulOperation>('idle')
  const [pos, setPos] = useState<Vec2D>(null)

  const [initialDragPos, setInitialDragPos] = useState<Vec2D>(null)
  const [currentDragPos, setCurrentDragPos] = useState<Vec2D>(null)

  const [size, setSize] = useState<Vec2D>({ x: 100, y: 100 })

  const element = useRef<HTMLDivElement>()

  useLayoutEffect(() => {
    const { x, y } = element.current.getBoundingClientRect()
    setPos({ x, y })
  }, [])

  let displayedPos: Vec2D
  if (pos) {
    displayedPos = { ...pos }

    if (operation === 'drag') {
      displayedPos.x += currentDragPos.x - initialDragPos.x
      displayedPos.y += currentDragPos.y - initialDragPos.y
    }
  }

  let displayedSize = { ...size }
  if (operation === 'resize') {
    displayedSize.x += currentDragPos.x - initialDragPos.x
    displayedSize.y += currentDragPos.y - initialDragPos.y
  }

  function beginOperation(initial: Vec2D, operation: MeaningfulOperation, onMouseUp: () => void) {
    setInitialDragPos(initial)
    setCurrentDragPos(initial)
    setOperation(operation)

    function onMouseMove(e: MouseEvent) {
      setCurrentDragPos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener(
      'mouseup',
      () => {
        setInitialDragPos(null)
        setCurrentDragPos(null)

        onMouseUp()

        setOperation('idle')
        window.removeEventListener('mousemove', onMouseMove)
      },
      { once: true },
    )

    window.addEventListener('mousemove', onMouseMove)
  }

  return (
    <div
      ref={element}
      onMouseDown={e => {
        beginOperation({ x: e.clientX, y: e.clientY }, 'drag', () => {
          const { x, y } = element.current.getBoundingClientRect()
          setPos({ x, y })
        })
      }}
      style={{
        width: Math.max(displayedSize.x, 24) + 'px',
        height: Math.max(displayedSize.y, 24) + 'px',
        backgroundColor: initialDragPos ? 'green' : 'black',
        ...(!displayedPos
          ? {}
          : {
              position: 'fixed',
              left: displayedPos.x + 'px',
              top: displayedPos.y + 'px',
            }),
      }}
    >
      <div
        style={{
          width: '10px',
          height: '10px',
          right: 0,
          bottom: 0,
          position: 'absolute',
          backgroundColor: 'red',
        }}
        onMouseDown={e => {
          e.stopPropagation()
          beginOperation({ x: e.clientX, y: e.clientY }, 'resize', () => {
            const { width, height } = element.current.getBoundingClientRect()
            setSize({ x: width, y: height })
          })
        }}
      ></div>
    </div>
  )
}

export default function DragResize() {
  return (
    <>
      <Box />
      <Box />
    </>
  )
}
