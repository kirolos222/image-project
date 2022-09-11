"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { hosts, db, users, passwords } = process.env;
const client = new pg_1.Pool({
    host: hosts,
    database: db,
    user: users,
    port: 5432,
    password: passwords,
});
console.log(client.query('SELECT * FROM user4'));
exports.default = client;
