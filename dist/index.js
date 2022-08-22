"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var routes_1 = __importDefault(require("./routes"));
var express_1 = __importDefault(require("express"));
var index = (0, express_1.default)();
var prot = 4000;
index.use(routes_1.default);
index.listen(prot, function () {
    console.log("server has startted at http://localhost:".concat(prot));
});
exports.default = index;
