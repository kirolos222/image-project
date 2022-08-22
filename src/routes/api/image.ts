import express from 'express'
import path from 'path'
import fs from 'fs'
import sharp from 'sharp'
const image = express.Router()
image.get(
  '/',
 (
    req: express.Request,
    res: express.Response
  ): (string | undefined) => {
    const imgname = req.query.imgname as string;
    const wi = req.query.wi as string;
    const wi2 = Number(wi); //get the img and width and height
    const hi = req.query.hi as string;
    const hi2 = Number(hi);
    const existimg = (path.resolve('./') + `/images/${imgname}.jpg`) as string; //to get the img path
    const istrue = fs.existsSync(existimg) as boolean;
    var dir = path.resolve('./') + `/images/thumbnail`;
    async function gho() {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir); //creat thumbnail file once
      }
    }
    if (imgname === undefined) {
      return res
        .status(404)
        .send(`the image file is undefined`) as unknown as string;
    } else if (!istrue && imgname != '') {
      return res
        .status(404)
        .send(`the image file doesn't exist`) as unknown as string;
    } else if (imgname === '') {
      return res
        .status(404)
        .send(
          ` imgname needs a value, please reenter the value`
        ) as unknown as string;
    } else if (
      wi2 === NaN ||
      hi2 === NaN ||
      wi === undefined ||
      hi === undefined ||
      wi2 === 0 ||
      hi2 === 0
    ) {
      return res
        .status(400)
        .send('unknown width && height') as unknown as string;
    }

    gho();
    const hg = (path.resolve('./') +
      `/images/thumbnail/${imgname}-${wi}-${hi}.jpg`) as string;
    if (fs.existsSync(hg) === true) {
      return res.status(200).sendFile(hg) as unknown as string;
    }
    sharp(existimg)
      .resize({
        width: wi2,
        height: hi2,
        fit: sharp.fit.cover,
        position: 'center',
      })
      .toFile(hg)
      .then(() => {
        res.status(200).sendFile(hg) as unknown as string;
      });
  }
);

export default image;
