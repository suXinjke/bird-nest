import express from 'express'
import cors from 'cors'

import objectionRoutes from './objection/routes.js'
import { asyncHandler, sleep } from './util.js'

const app = express()
const port = 3000

app.use('/objection', objectionRoutes)

app.get('/ping', (req, res) => {
  const desiredStatus = parseInt(req.query.status as string) || 200

  res.status(desiredStatus).json({
    pong: desiredStatus,
  })
})

app.get(
  '/delay',
  asyncHandler(async (req, res) => {
    const desiredDelay = parseInt(req.query.msec as string) || 1000

    await sleep(desiredDelay)

    res.json({
      status: 'done',
      delay: desiredDelay,
    })
  }),
)

app.get(
  '/ducksu',
  cors({
    // some random fetch/axios now can make sense of filename
    exposedHeaders: 'content-disposition',
  }),
  (req, res) => {
    res.download('./serve/duck.png', 'special_duck.png')
  },
)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).json({
    message: 'Internal Server Error',
  })
})

app.listen(port, 'localhost', () => {
  console.log(`server listening on port ${port}`)
})
