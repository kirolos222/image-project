"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usernn = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../database"));
const pepper = process.env.BCRYPT_PASSWORD;
class Usernn {
    async index() {
        try {
            const conn = (await database_1.default.connect());
            const sql = 'SELECT * FROM user4';
            const result = (await conn.query(sql));
            void conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = (await database_1.default.connect());
            const sql = 'SELECT * FROM user4 WHERE id=($1)';
            const result = (await conn.query(sql, [id]));
            void conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    async create(u) {
        try {
            const conn = (await database_1.default.connect());
            const sql = 'INSERT INTO user4 (id, password, username, firstname, lastname) VALUES($1, $2, $3, $4, $5) RETURNING *';
            const hash = bcrypt_1.default.hashSync(u.password + pepper, parseInt(process.env.SALT_ROUNDS));
            const result = (await conn.query(sql, [
                u.id,
                hash,
                u.username,
                u.firstname,
                u.lastname,
            ]));
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`unable create user (${u.username}): ${err}`);
        }
    }
    async authenticate(username, password) {
        const conn = (await database_1.default.connect());
        const sql = 'SELECT password FROM user4 WHERE username=($1)';
        const result = (await conn.query(sql, [
            username,
        ]));
        console.log(password);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(process.env.SALT_ROUNDS));
            console.log(user);
            if (bcrypt_1.default.compareSync(`${password}${pepper}`, hash)) {
                return user;
            }
        }
        return null;
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM user4 WHERE id=($1)';
            const conn = (await database_1.default.connect());
            const result = (await conn.query(sql, [id]));
            const book = result.rows[0];
            void conn.release;
            return book;
        }
        catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`);
        }
    }
}
exports.Usernn = Usernn;
