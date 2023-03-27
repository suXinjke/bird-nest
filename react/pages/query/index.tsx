import { StrictMode } from 'react'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Fetch from './Fetch'
import WebSocketStrict from './WebSocketStrict'
import ReactQuery from './ReactQuery'

const queryClient = new QueryClient()

export default function QueryPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="fetch" element={<Fetch />} />
        <Route
          path="fetch-strict"
          element={
            <StrictMode>
              <WebSocketStrict />
            </StrictMode>
          }
        />
        <Route path="react-query" element={<ReactQuery />} />
      </Routes>
    </QueryClientProvider>
  )
}
