import jwt from 'jsonwebtoken'
import express, { Request, Response } from 'express'
import { User, Usernn } from '../model/user'
import verifyAuthToken from '../middleware/verify'
const store = new Usernn()
const index = async (_req: Request, res: Response): Promise<void> => {
  const weapen = await store.index()
  res.json(weapen)
}

const show = async (_req: Request, res: Response): Promise<void> => {
  const weapen = await store.show(_req.params.id)
  res.json(weapen)
}
const create = async (req: Request, res: Response): Promise<void> => {
  const user: User = {
    id: req.body.id,
    password: req.body.password,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }
  try {
    const newUser = await store.create(user)
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as unknown as string
    )
    res.status(200).json(token)
  } catch (err) {
    res.status(400)
    res.json(`the user cannot be creted because ${err}`)
  }
}
const authenticate = async (req: Request, res: Response): Promise<void> => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
    id: req.body.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }
  try {
    const u = await store.authenticate(user.username, user.password)
    const token = jwt.sign(
      { user: u },
      process.env.TOKEN_SECRET as unknown as string
    )
    res.json(token)
  } catch (error) {
    res.status(401)
    res.json(error)
  }
}
const update = async (req: Request, res: Response): Promise<void> => {
  const user: User = {
    id: parseInt(req.params.id),
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  }
  try {
    const authorizationHeader = req.headers.authorization as unknown as string
    const token = authorizationHeader.split(' ')[1] as unknown as string
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as unknown as string
    ) as unknown as User
    if (decoded.id !== user.id) {
      throw new Error('User id does not match!')
    }
  } catch (err) {
    res.status(401)
    res.json(err)
    return
  }

  try {
    const updated = await store.create(user)
    res.json(updated)
  } catch (err) {
    res.status(400)
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    res.json(err)
  }
}
const destroy = async (req: Request, res: Response): Promise<void> => {
  const weapen = await store.delete(req.params.id)
  res.json(weapen)
}
const mount = (app: express.Application): void => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
  app.post('/usersauth', authenticate)
  app.put('/users/:id', verifyAuthToken, update)
  app.delete('/users/:id', verifyAuthToken, destroy)
}
export default mount
