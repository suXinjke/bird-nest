import express from 'express'
import { createCanvas, loadImage } from 'canvas'
import cors from 'cors'

import objectionRoutes from './objection/routes.js'
import otpRoutes from './otp/routes.js'
import fileRoutes from './file/routes.js'
import { asyncHandler, sleep } from './util.js'

const app = express()
const port = 3000

app.use('/objection', objectionRoutes)
app.use('/otp', otpRoutes)
app.use('/file', fileRoutes)

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

app.get(
  '/ducksu-canvas',
  asyncHandler(async (req, res) => {
    const duck = await loadImage('./serve/duck.png')

    const canvas = createCanvas(duck.width, duck.height)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, duck.width, duck.height)

    ctx.drawImage(duck, 0, 0, duck.width, duck.height)
    res.contentType('png').send(canvas.toBuffer())
  }),
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
