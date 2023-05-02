import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { asyncHandler } from '../util.js'

const router = express.Router()
const upload = multer()

router.post(
  '/',
  cors(),
  upload.single('pic'),
  asyncHandler(async (req, res) => {
    res.contentType('png').send(req.file.buffer)
  }),
)

export default router
