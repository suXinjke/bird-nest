import { Route, Routes } from 'react-router-dom'

import MobXRegular from './Regular'

export default function MobXPage() {
  return (
    <Routes>
      <Route path="regular" element={<MobXRegular />} />
    </Routes>
  )
}
