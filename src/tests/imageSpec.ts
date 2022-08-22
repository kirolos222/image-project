import supertest from 'supertest';
import index from '../index';
import path from 'path';
import fsExists from 'fs.promises.exists';
const request = supertest(index);
describe('Test endpoint responses', ():void => {
    it('gets the api endpoint',  (done):void => {
        supertest(index).get('/').expect(200,done)
           }
)
it('gets the api endpoint',  (done):void => {
    supertest(index).get('/image?imgname').expect(404,done)
       }
)
it('gets the api endpoint',  (done):void => {
    supertest(index).get('/image?imgname=fjord').expect(400,done)
       }
)
it('gets the api endpoint',  (done):void => {
    supertest(index).get('/image?').expect(404,done)
       }
)
it('gets the api endpoint',  ():void => {
    supertest(index).get('/image?imgname=fjord&wi=100&hi=200').expect(200)
       }
)
it('gets the api endpoint',  ():void => {
    supertest(index).get('/image?imgname=fjord&wi=').expect(400)
       }
)
});
describe('Test if the photo is present', () => {
    it('send a correct photo',  async () => {
        const istrue = (await fsExists(path.resolve('./') + `/images/fjord.jpg`)) as boolean
        expect(istrue).toBeTrue
           }
        )
it('send a false one',  async() => {
const url= path.resolve('./') + `/images/fj.jpg`
expect(url).toBeFalse
       }
)

});