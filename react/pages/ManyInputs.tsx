import { useCallback, useState, memo } from 'react'

function _Input({ value, id, onChange }) {
  return <input style={{ display: 'block' }} value={value} data-id={id} onChange={onChange} />
}
const Input = memo(_Input)

const itemCount = 10000

export default function ManyInputs() {
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
  const [ids] = useState(() => Array.from({ length: itemCount }, (_, i) => i))

  const handleChange = useCallback(function (e) {
    const { id } = e.target.dataset

    setById(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        value: e.target.value,
      },
    }))
  }, [])

  return (
    <>
      <p>{itemCount} inputs, only the edited input is rerendered</p>
      {ids.map(id => (
        <Input key={id} value={byId[id].value} id={id} onChange={handleChange} />
      ))}
    </>
  )
}
