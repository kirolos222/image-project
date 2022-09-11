"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../model/orders");
const verify_1 = __importDefault(require("../middleware/verify"));
const store = new orders_1.OrderStore();
const index = async (_req, res) => {
    const weapen = await store.index();
    res.json(weapen);
};
const showcurrent = async (req, res) => {
    const weapen = await store.showcurrent(req.params.id);
    res.json(weapen);
};
const create = async (req, res) => {
    const OrderStore = {
        id: req.body.id,
        status: req.body.status,
        user_id: req.body.user_id,
        products_id: req.body.products_id,
        quantity: req.body.quantity
    };
    try {
        const weapen = await store.create(OrderStore);
        res.status(200).json(weapen);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const delet = async (req, res) => {
    const weapen = await store.delete(req.params.id);
    res.json(weapen);
};
const myorder = (app) => {
    app.get('/orders', verify_1.default, index);
    app.get('/orders/:id', verify_1.default, showcurrent);
    app.post('/orders', verify_1.default, create);
    app.delete('/orders/:id', delet);
};
exports.default = myorder;
