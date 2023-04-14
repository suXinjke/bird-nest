import { useState } from 'react'
import Sum from './sum'
import ClientThingy from './ClientThingy'

export default function SumPage() {
  return (
    <>
      <h1>Sum page</h1>
      <Sum a={10} b={30} />
      <ClientThingy />
    </>
  )
}
