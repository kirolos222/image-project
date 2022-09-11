"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsStore = void 0;
const process_1 = require("process");
const database_1 = __importDefault(require("../database"));
class ProductsStore {
    async index() {
        try {
            const conn = (await database_1.default.connect());
            const sql = 'SELECT * FROM products';
            const result = (await conn.query(sql));
            void conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = (await database_1.default.connect());
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = (await conn.query(sql, [id]));
            void conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(b) {
        try {
            const sql = 'INSERT INTO products (id, name, price) VALUES($1, $2, $3) RETURNING *';
            const conn = (await database_1.default.connect());
            const result = (await conn.query(sql, [
                b.id,
                b.name,
                b.price,
            ]));
            const products = result.rows[0];
            conn.release();
            return products;
        }
        catch (err) {
            throw new Error(`Could not add new products ${process_1.title}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            const conn = (await database_1.default.connect());
            const result = (await conn.query(sql, [id]));
            const products = result.rows[0];
            void conn.release();
            return products;
        }
        catch (err) {
            throw new Error(`Could not delete products ${id}. Error: ${err}`);
        }
    }
}
exports.ProductsStore = ProductsStore;
