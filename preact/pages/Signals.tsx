import { useSignal, useComputed } from '@preact/signals'

function Number() {
  // This signal update does not cause
  // rerender of entire component, unless you render `.value`
  const count = useSignal(0)

  return (
    <div>
      <span>the count is {count} </span>
      <button onClick={() => count.value++}>Increase</button>
    </div>
  )
}

function ListOfNumbers() {
  // Signal update on array DOES cause
  // rerender of entire component, blame `.value`
  const numbers = useSignal<number[]>([])

  return (
    <div>
      <button
        onClick={() => {
          numbers.value = numbers.value.concat(Math.random())
        }}
      >
        add number
      </button>
      {numbers.value.map((number, i) => (
        <div key={i}>{number}</div>
      ))}
    </div>
  )
}

export default function Signals() {
  return (
    <>
      <Number />
      <ListOfNumbers />
    </>
  )
}
