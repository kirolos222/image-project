import express from 'express'
import path from 'path'
import fs from 'fs'
import func from '../api/sharpe'
const image = express.Router()
image.get(
  '/',
  (
    req: express.Request,
    res: express.Response
  ): (string | undefined) => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const imgname = req.query.imgname as string
    const wi = req.query.wi as string
    const wi2 = Number(wi) // get the img and width and height
    const hi = req.query.hi as string
    const hi2 = Number(hi)
    const existimg = (path.resolve('./') + `/images/${imgname}.jpg`) // to get the img path
    const istrue = fs.existsSync(existimg)
    const hg = (path.resolve('./') +
`/images/thumbnail/${imgname}-${wi}-${hi}.jpg`)
    if (imgname === undefined) {
      return res
        .status(404)
        .send('the image file is undefined') as unknown as string
    // eslint-disable-next-line eqeqeq
    } else if (!istrue && imgname != '') {
      return res
        .status(404)
        .send('the image file doesn\'t exist') as unknown as string
    } else if (imgname === '') {
      return res
        .status(404)
        .send(
          ' imgname needs a value, please reenter the value'
        ) as unknown as string
    } else if (
      // eslint-disable-next-line use-isnan
      wi2 === NaN ||
      // eslint-disable-next-line use-isnan
      hi2 === NaN ||
      wi === undefined ||
      hi === undefined ||
      wi2 === 0 ||
      hi2 === 0
    ) {
      return res
        .status(400)
        .send('unknown width && height') as unknown as string
    }
    if (fs.existsSync(hg)) {
      return res.status(200).sendFile(hg) as unknown as string
    }
    func(existimg, wi2, hi2, hg, res)
  }
)

export default image
