import * as dateFns from 'date-fns'

export default function LazyPage() {
  console.log(dateFns)
  return <div>lazy page, it logged fat dateFns library just now</div>
}
