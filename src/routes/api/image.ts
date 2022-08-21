import express from 'express';
import path from 'path';
import fs from 'fs';
import fsExists from 'fs.promises.exists';
import sharp from 'sharp';
const image = express.Router();
image.get('/', async (req: express.Request, res: express.Response) => {
  const imgname = req.query.imgname as string;
  const wi = req.query.wi as string;
  const wi2 = Number(wi);                     //get the img and width and height
  const hi = req.query.hi as string;
  const hi2 = Number(hi);
  const existimg = (path.resolve('./') + `/images/${imgname}.jpg`) as string; //to get the img path
  const istrue = (await fsExists(existimg)) as boolean;
  var dir = path.resolve('./') + `/images/thumbnail`;
  async function gho() {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);        //creat thumbnail file once
    }
  } if (imgname === undefined) {
    return res.status(404).send(`the image file is undefined`);
  } else if (!istrue && imgname != '') {
    return res.status(404).send(`the image file doesn't exist`);
  }  else if (imgname === '') {
    return res
      .status(404)
      .send(` imgname needs a value, please reenter the value`);
  } 
  else if((wi2===NaN||hi2===NaN)||(wi===undefined|| hi===undefined)||(wi2===0||hi2===0)){
    return res.status(400).send('unknown width && height');
  } 
  
  gho();
    const hg = (path.resolve('./') +
      `/images/thumbnail/${imgname}-${wi}-${hi}.jpg`) as string;
    sharp(existimg)
      .resize({
        width: wi2,
        height: hi2,
        fit: sharp.fit.cover,
        position: 'center',

      })
      .toFile(hg)
      res.status(200).sendFile(hg);
  });


export default image;
//to test the project 
//http://localhost:4000/image?imgname=thephotoname&wi=yourwidth&hi=yourheight