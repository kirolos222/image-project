import express, { Request, Response } from 'express'
import { orders, OrderStore } from '../model/orders'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middleware/verify'
const store = new OrderStore()
const index = async (_req: Request, res: Response): Promise<void> => {
  const weapen = await store.index()
  res.json(weapen)
}

const showcurrent = async (req: Request, res: Response): Promise<void> => {
  const weapen = await store.showcurrent(req.params.id)
  res.json(weapen)
}

const create = async (req: Request, res: Response): Promise<void> => {
  const OrderStore: orders = {
    id: req.body.id,
    status: req.body.status,
    user_id: req.body.user_id,
    products_id: req.body.products_id,
    quantity: req.body.quantity
  }
  try {
    const weapen = await store.create(OrderStore)
    res.status(200).json(weapen)
  } catch (err) {
    res.status(400).json(err)
  }
}
const delet = async (req: Request, res: Response): Promise<void> => {
  const weapen = await store.delete(req.params.id)
  res.json(weapen)
}
const myorder = (app: express.Application): void => {
  app.get('/orders', verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken, showcurrent)
  app.post('/orders', verifyAuthToken, create)
  app.delete('/orders/:id', delet)
}
export default myorder
