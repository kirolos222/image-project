import express, { Request, Response } from 'express';
import { products, ProductsStore } from '../model/products';
import client from '../database';
import jwt from 'jsonwebtoken';
import verifyAuthToken from '../middleware/verify';
const store = new ProductsStore();
const index = async (_req: Request, res: Response): Promise<void> => {
  const weapen = await store.index();
  res.json(weapen);
};

const show = async (_req: Request, res: Response): Promise<void> => {
  const weapen = await store.show(_req.params.id);
  res.json(weapen);
};

const create = async (req: Request, res: Response): Promise<void> => {
  const productstore: products = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  };
  // jwt.verify(req.body.token, process.env.TOKEN_SECRET as unknown as string)
  try {
    const weapen = await store.create(productstore);
    res.json(weapen);
  } catch (err) {
    res.status(400);
    res.json(`products cannot be creted because ${err}`);
  }
};
const delet = async (req: Request, res: Response): Promise<void> => {
  const weapen = await store.delete(req.params.id);
  res.json(weapen);
};
const myproduct = (app: express.Application): void => {
  app.get('/products', verifyAuthToken, index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.delete('/products/:id', delet);
};
export default myproduct;
