"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const myusers_1 = __importDefault(require("./handlers/myusers"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const myorders_1 = __importDefault(require("./handlers/myorders"));
const myproducts_1 = __importDefault(require("./handlers/myproducts"));
const app = (0, express_1.default)();
const adress = '0.0.0.0:5000';
const cor = {
    origin: 'https://stackoverflow.com/questions/62870228/typeerror-the-first-argument-must-be-one-of-type-string-buffer-arraybuffer-a',
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(cor));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('helloworld');
});
(0, myusers_1.default)(app);
(0, myorders_1.default)(app);
(0, myproducts_1.default)(app);
app.listen(5000, function () {
    console.log(`statring on port ${adress}`);
});
