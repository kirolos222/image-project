"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../model/products");
const verify_1 = __importDefault(require("../middleware/verify"));
const store = new products_1.ProductsStore();
const index = async (_req, res) => {
    const weapen = await store.index();
    res.json(weapen);
};
const show = async (_req, res) => {
    const weapen = await store.show(_req.params.id);
    res.json(weapen);
};
const create = async (req, res) => {
    const productstore = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
    };
    // jwt.verify(req.body.token, process.env.TOKEN_SECRET as unknown as string)
    try {
        const weapen = await store.create(productstore);
        res.json(weapen);
    }
    catch (err) {
        res.status(400);
        res.json(`products cannot be creted because ${err}`);
    }
};
const delet = async (req, res) => {
    const weapen = await store.delete(req.params.id);
    res.json(weapen);
};
const myproduct = (app) => {
    app.get('/products', verify_1.default, index);
    app.get('/products/:id', show);
    app.post('/products', verify_1.default, create);
    app.delete('/products/:id', delet);
};
exports.default = myproduct;
