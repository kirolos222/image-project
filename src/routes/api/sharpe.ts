import sharp from 'sharp'
import fs from 'fs'
import express from 'express'
import path from 'path'
const dir = path.resolve('./') + '/images/thumbnail'
const yes = fs.existsSync(dir)
function gho (): void {
  if (!yes) {
    fs.mkdirSync(dir) // creat thumbnail file once
  }
}
gho()
const func = (existimg: string, wi2: number, hi2: number, hg: string, res: express.Response): boolean => {
  void sharp(existimg)
    .resize({
      width: wi2,
      height: hi2,
      fit: sharp.fit.cover,
      position: 'center'
    })
    .toFile(hg)
    .then(() => {
      res.status(200).sendFile(hg) as unknown as string
    })
  return true
}
export default func
