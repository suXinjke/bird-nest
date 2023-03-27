const canvas = document.createElement('canvas')

const width = 640
const height = 360

canvas.width = width
canvas.height = height
document.querySelector('#content').appendChild(canvas)

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d')

let lastTime = 0

function draw(dt) {
  console.log({ dt })

  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.fillRect(0, 0, width, height)

  ctx.moveTo(0, 0)
  ctx.lineTo(width, height)

  ctx.moveTo(width, 0)
  ctx.lineTo(0, height)
  ctx.stroke()
}

function loop(time) {
  const dt = time - lastTime
  lastTime = time

  draw(dt)

  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
