/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { title } from 'process'
import client from '../database'
import { PoolClient, QueryResult } from 'pg'
export interface orders {
  id: number
  status: string
  user_id: string
  products_id: string
  quantity: number
}

export class OrderStore {
  async index (): Promise<orders[]> {
    try {
      const conn = await client.connect() as unknown as PoolClient
      const sql = 'SELECT * FROM orders' as unknown as string
      const result = await conn.query(sql) as unknown as QueryResult
      void conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`)
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async showcurrent (user_id: string): Promise<orders> {
    try {
      const conn = (await client.connect()) as unknown as PoolClient
      const sql = 'SELECT * FROM orders WHERE user_id=($1) ORDER BY id DESC' as unknown as string
      const result = (await conn.query(sql, [user_id])) as unknown as QueryResult
      void conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${user_id}. Error: ${err}`)
    }
  }

  async create (b: orders): Promise<orders> {
    try {
      const sql = 'INSERT INTO orders (id, status, user_id, products_id, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *' as unknown as string
      const conn = await client.connect() as unknown as PoolClient
      const result = await conn
        .query(sql, [b.id, b.status, b.user_id, b.products_id, b.quantity]) as unknown as QueryResult
      const order = result.rows[0]
      if (order.status as unknown as string !== ('open' || 'active')) {
        throw new Error(`Could not  order ${b.id} because order status is ${b.status}`)
      }
      void conn.release()
      return order
    } catch (err) {
      throw new Error(`Could not add new order ${title}. Error: ${err}`)
    }
  }

  async delete (id: string): Promise<orders> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1)' as unknown as string
      const conn = await client.connect() as unknown as PoolClient
      const result = await conn.query(sql, [id]) as unknown as QueryResult
      const order = result.rows[0]

      void conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
  }
}
