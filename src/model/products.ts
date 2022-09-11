import { title } from 'process';
import client from '../database';
import { PoolClient, QueryResult } from 'pg';
export interface products {
  id: number;
  name: string;
  price: number;
}

export class ProductsStore {
  async index(): Promise<products[]> {
    try {
      const conn = (await client.connect()) as unknown as PoolClient;
      const sql = 'SELECT * FROM products' as unknown as string;
      const result = (await conn.query(sql)) as unknown as QueryResult;
      void conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<products> {
    try {
      const conn = (await client.connect()) as unknown as PoolClient
      const sql = 'SELECT * FROM products WHERE id=($1)' as unknown as string

      const result = (await conn.query(sql, [id])) as unknown as QueryResult
      void conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(b: products): Promise<products> {
    try {
      const sql =
        'INSERT INTO products (id, name, price) VALUES($1, $2, $3) RETURNING *' as unknown as string;
      const conn = (await client.connect()) as unknown as PoolClient;
      const result = (await conn.query(sql, [
        b.id,
        b.name,
        b.price,
      ])) as unknown as QueryResult;
      const products = result.rows[0];
      conn.release();
      return products;
    } catch (err) {
      throw new Error(`Could not add new products ${title}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<products> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)' as unknown as string;
      const conn = (await client.connect()) as unknown as PoolClient;
      const result = (await conn.query(sql, [id])) as unknown as QueryResult;
      const products = result.rows[0];

      void conn.release();

      return products;
    } catch (err) {
      throw new Error(`Could not delete products ${id}. Error: ${err}`);
    }
  }
}
