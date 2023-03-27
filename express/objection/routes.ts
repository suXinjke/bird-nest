import express from 'express'
import { asyncHandler } from '../util.js'
import { Customer, Product } from './db.js'

const router = express.Router()

router.get(
  '/customers',
  asyncHandler(async (req, res) => {
    const customers = await Customer.query()
    res.json(customers)
  }),
)

router.get(
  '/customers/:id',
  asyncHandler(async (req, res) => {
    const customer = await Customer.query()
      .findById(req.params.id)
      .withGraphJoined('orders.details')

    if (!customer) {
      return res.status(404).json({
        message: 'not found',
      })
    }

    res.json(customer)
  }),
)

router.get(
  '/products',
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page as string) || 1
    const products = await Product.query()
      .orderBy('ProductID')
      .limit(10)
      .offset((page - 1) * 10)
    res.json(products)
  }),
)

router.get(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.query().findById(req.params.id)
    if (!product) {
      return res.status(404).json({
        message: 'not found',
      })
    }

    res.json(product)
  }),
)

export default router
