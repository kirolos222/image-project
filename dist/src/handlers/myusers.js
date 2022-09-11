"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../model/user");
const verify_1 = __importDefault(require("../middleware/verify"));
const store = new user_1.Usernn();
const index = async (_req, res) => {
    const weapen = await store.index();
    res.json(weapen);
};
const show = async (_req, res) => {
    const weapen = await store.show(_req.params.id);
    res.json(weapen);
};
const create = async (req, res) => {
    const user = {
        id: req.body.id,
        password: req.body.password,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    try {
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.status(200).json(token);
    }
    catch (err) {
        res.status(400);
        res.json(`the user cannot be creted because ${err}`);
    }
};
const authenticate = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    try {
        const u = await store.authenticate(user.username, user.password);
        const token = jsonwebtoken_1.default.sign({ user: u }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json(error);
    }
};
const update = async (req, res) => {
    const user = {
        id: parseInt(req.params.id),
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        if (decoded.id !== user.id) {
            throw new Error('User id does not match!');
        }
    }
    catch (err) {
        res.status(401);
        res.json(err);
        return;
    }
    try {
        const updated = await store.create(user);
        res.json(updated);
    }
    catch (err) {
        res.status(400);
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        res.json(err);
    }
};
const destroy = async (req, res) => {
    const weapen = await store.delete(req.params.id);
    res.json(weapen);
};
const mount = (app) => {
    app.get('/users', verify_1.default, index);
    app.get('/users/:id', verify_1.default, show);
    app.post('/users', create);
    app.post('/usersauth', authenticate);
    app.put('/users/:id', verify_1.default, update);
    app.delete('/users/:id', verify_1.default, destroy);
};
exports.default = mount;
