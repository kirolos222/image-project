"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var dir = path_1.default.resolve('./') + '/images/thumbnail';
var yes = fs_1.default.existsSync(dir);
function gho() {
    if (!yes) {
        fs_1.default.mkdirSync(dir); // creat thumbnail file once
    }
}
gho();
var func = function (existimg, wi2, hi2, hg, res) {
    void (0, sharp_1.default)(existimg)
        .resize({
        width: wi2,
        height: hi2,
        fit: sharp_1.default.fit.cover,
        position: 'center'
    })
        .toFile(hg)
        .then(function () {
        res.status(200).sendFile(hg);
    });
    return true;
};
exports.default = func;
