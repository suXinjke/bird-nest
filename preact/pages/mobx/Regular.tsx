import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

class Item {
  value = 'default_value'

  setRandomNumber() {
    this.value = Math.random().toString()
  }

  constructor() {
    makeAutoObservable(this)
  }
}

const itemHolder = makeAutoObservable({
  item1: new Item(),
  item2: new Item(),
  nest: {
    item3: new Item(),
  },
})
window['itemHolder'] = itemHolder

const Item1 = observer(() => {
  return <div>Item1: {itemHolder.item1.value}</div>
})

const Item2 = observer(() => {
  return <div>Item2: {itemHolder.item2.value}</div>
})

const Item3 = observer(({ value }: { value: { item3: Item } }) => {
  return <div>Item3: {value.item3.value}</div>
})

function MobXRegular() {
  return (
    <div>
      <span>window.itemHolder is exposed - go try interacting with it</span>
      <Item1 />
      <Item2 />
      <Item3 value={itemHolder.nest} />
    </div>
  )
}

export default MobXRegular
