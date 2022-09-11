import bcrypt from 'bcrypt';
import client from '../database';
import { PoolClient, QueryResult } from 'pg';
export interface User {
  id: number;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
}
const pepper = process.env.BCRYPT_PASSWORD as unknown as string;
export class Usernn {
  async index(): Promise<User[]> {
    try {
      const conn: PoolClient =
        (await client.connect()) as unknown as PoolClient;
      const sql: string = 'SELECT * FROM user4';
      const result: QueryResult = (await conn.query(
        sql
      )) as unknown as QueryResult;
      void conn.release();
      return result.rows as unknown as User[];
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = (await client.connect()) as unknown as PoolClient;
      const sql = 'SELECT * FROM user4 WHERE id=($1)' as unknown as string;

      const result = (await conn.query(sql, [id])) as unknown as QueryResult;
      void conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = (await client.connect()) as unknown as PoolClient;
      const sql =
        'INSERT INTO user4 (id, password, username, firstname, lastname) VALUES($1, $2, $3, $4, $5) RETURNING *' as unknown as string;

      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(process.env.SALT_ROUNDS as unknown as string)
      );

      const result = (await conn.query(sql, [
        u.id,
        hash,
        u.username,
        u.firstname,
        u.lastname,
      ])) as unknown as QueryResult;
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = (await client.connect()) as unknown as PoolClient;
    const sql =
      'SELECT password FROM user4 WHERE username=($1)' as unknown as string;

    const result = (await conn.query(sql, [
      username,
    ])) as unknown as QueryResult;

    console.log(password);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const hash = bcrypt.hashSync(
        (user.password as unknown as string) + pepper,
        parseInt(process.env.SALT_ROUNDS as unknown as string)
      );
      console.log(user);

      if (bcrypt.compareSync(`${password}${pepper}`, hash)) {
        return user;
      }
    }

    return null;
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM user4 WHERE id=($1)' as unknown as string;
      const conn = (await client.connect()) as unknown as PoolClient;

      const result = (await conn.query(sql, [id])) as unknown as QueryResult;
      const book = result.rows[0];

      void conn.release;

      return book;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
