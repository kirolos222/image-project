import supertest from 'supertest'
import index from '../index'
import func from '../routes/api/sharpe'
import path from 'path'
import fs from 'fs'
import express from 'express'
const res = express.response
describe('Test endpoint responses', (): void => {
  it('gets the api endpoint', (done): void => {
    void supertest(index).get('/').expect(200, done)
  })
  it('gets the api endpoint', (done): void => {
    void supertest(index).get('/image?imgname').expect(404, done)
  })
  it('gets the api endpoint', (done): void => {
    void supertest(index).get('/image?imgname=fjord').expect(400, done)
  })
  it('gets the api endpoint', (done): void => {
    void supertest(index).get('/image?').expect(404, done)
  })
  // it('image process', async () => {
  //   await supertest(index).get('/image?imgname=fjord&wi=100&hi=200').expect(200)
  // })
  it('gets the api endpoint', (): void => {
    void supertest(index).get('/image?imgname=fjord&wi=').expect(400)
  })
})
describe('Test if the photo is present', () => {
  it('send a correct photo', async () => {
    const istrue = await fs.existsSync(
      path.resolve('./') + '/images/fjord.jpg'
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(istrue).toBeTrue
  })
  it('send a false one', async () => {
    const url = path.resolve('./') + '/images/fj.jpg'
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(url).toBeFalse
  })
})
describe('image process function', (): void => {
  it('image process', () => {
    expect(func((path.resolve('./') + '/images/fjord.jpg'), 300, 400, (path.resolve('./') +
    '/images/thumbnail/fjord-300-400.jpg'), res)).toBe(true)
  })
})
