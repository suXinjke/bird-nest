import { useState } from 'react'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'

function _Input({ inputData, id, onChange }) {
  return (
    <input style={{ display: 'block' }} value={inputData.value} data-id={id} onChange={onChange} />
  )
}
const Input = observer(_Input)

const itemCount = 10000

function makeInputData(value: string) {
  return makeAutoObservable({
    value,
    setValue(value: string) {
      this.value = value
    },
  })
}

export default function ManyInputs() {
  const [byId] = useState(() => {
    const result = {}
    for (let i = 0; i < itemCount; i++) {
      result[i] = makeInputData('text_' + i)
    }
    return result
  })
  const [ids] = useState(() => Array.from({ length: itemCount }, (_, i) => i))

  function handleChange(e) {
    const { id } = e.target.dataset
    byId[id].setValue(e.target.value)
  }

  return (
    <>
      <p>
        {itemCount} inputs, only the edited input is rerendered. MobX setup is faster than regular
        one because it doesn't cause the Array.map to execute again every time.
      </p>
      {ids.map(id => (
        <Input key={id} inputData={byId[id]} id={id} onChange={handleChange} />
      ))}
    </>
  )
}
