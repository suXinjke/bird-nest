import express from 'express'
import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import { asyncHandler } from '../util.js'

const router = express.Router()

const secret = {
  ascii: '9VLT$<^FpytG%w$T0:Q}JZPc7Nh?X#Iy',
  hex: '39564c54243c5e467079744725772454303a517d4a5a5063374e683f58234979',
  base32: 'HFLEYVBEHRPEM4DZORDSK5ZEKQYDUUL5JJNFAYZXJZUD6WBDJF4Q',
  otpauth_url:
    'otpauth://totp/SecretKey?secret=HFLEYVBEHRPEM4DZORDSK5ZEKQYDUUL5JJNFAYZXJZUD6WBDJF4Q',
}

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const code = await qrcode.toBuffer(secret.otpauth_url)
    res.contentType('png').send(code)
  }),
)

router.get(
  '/qrexample',
  asyncHandler(async (req, res) => {
    const code = await qrcode.toBuffer((req.query.msg as string) || 'hello world')
    res.contentType('png').send(code)
  }),
)

router.get(
  '/validate',
  asyncHandler(async (req, res) => {
    const token = req.query.token as string

    const ok = speakeasy.totp.verify({ secret: secret.base32, encoding: 'base32', token })
    res.json({ ok })
  }),
)

export default router
