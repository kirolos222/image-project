"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var sharpe_1 = __importDefault(require("../api/sharpe"));
var image = express_1.default.Router();
image.get('/', function (req, res) {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    var imgname = req.query.imgname;
    var wi = req.query.wi;
    var wi2 = Number(wi); // get the img and width and height
    var hi = req.query.hi;
    var hi2 = Number(hi);
    var existimg = (path_1.default.resolve('./') + "/images/".concat(imgname, ".jpg")); // to get the img path
    var istrue = fs_1.default.existsSync(existimg);
    var hg = (path_1.default.resolve('./') +
        "/images/thumbnail/".concat(imgname, "-").concat(wi, "-").concat(hi, ".jpg"));
    if (imgname === undefined) {
        return res
            .status(404)
            .send('the image file is undefined');
        // eslint-disable-next-line eqeqeq
    }
    else if (!istrue && imgname != '') {
        return res
            .status(404)
            .send('the image file doesn\'t exist');
    }
    else if (imgname === '') {
        return res
            .status(404)
            .send(' imgname needs a value, please reenter the value');
    }
    else if (
    // eslint-disable-next-line use-isnan
    wi2 === NaN ||
        // eslint-disable-next-line use-isnan
        hi2 === NaN ||
        wi === undefined ||
        hi === undefined ||
        wi2 === 0 ||
        hi2 === 0) {
        return res
            .status(400)
            .send('unknown width && height');
    }
    if (fs_1.default.existsSync(hg)) {
        return res.status(200).sendFile(hg);
    }
    (0, sharpe_1.default)(existimg, wi2, hi2, hg, res);
});
exports.default = image;
